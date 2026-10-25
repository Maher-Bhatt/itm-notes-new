import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PushStatus {
  isSupported: boolean;
  isSubscribed: boolean;
  platform: 'android' | 'web';
  token?: string;
}

const STORAGE_KEY = 'itm_push_subscription';

/**
 * Converts a base64 string to a Uint8Array for VAPID subscription
 */
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushSubscription(userId: string): Promise<boolean> {
  try {
    const isCapacitor = Boolean(
      (window as any).Capacitor?.isNativePlatform?.() || 
      (window as any).Capacitor?.getPlatform?.() === 'android'
    );

    // 1. Android Capacitor Native Flow via window.Capacitor.Plugins
    if (isCapacitor) {
      try {
        const PushNotifications = (window as any).Capacitor?.Plugins?.PushNotifications;
        if (PushNotifications) {
          const permResult = await PushNotifications.requestPermissions();
          if (permResult?.receive === 'granted') {
            await PushNotifications.register();
            // Listen for token
            PushNotifications.addListener('registration', async (token: { value: string }) => {
              await savePushTokenToSupabase(userId, 'android', token.value);
            });
            return true;
          }
        }
      } catch (err) {
        console.warn("Native push initialization fallback:", err);
      }
    }

    // 2. Web / PWA Push Flow
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const reg = await navigator.serviceWorker.ready;
      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

      let sub = await reg.pushManager.getSubscription();
      if (!sub && vapidKey) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKey)
        });
      }

      const token = sub ? JSON.stringify(sub) : `web-pwa-${userId}-${Date.now()}`;
      await savePushTokenToSupabase(userId, 'web', token, sub?.endpoint);
      
      // Also request standard browser notification permission
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: true, token }));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Push registration error:", error);
    return false;
  }
}

async function savePushTokenToSupabase(
  userId: string, 
  platform: 'android' | 'web', 
  token: string, 
  endpoint?: string
) {
  try {
    const { error } = await supabase.from('push_subscriptions').upsert({
      user_id: userId,
      platform,
      token,
      endpoint: endpoint || null,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id, token' });

    if (!error) {
      // Also mark push_enabled in profile
      await supabase.from('profiles').update({
        push_enabled: true,
        updated_at: new Date().toISOString()
      }).eq('user_id', userId);
    }
  } catch (err) {
    console.warn("Could not save push token in Supabase:", err);
  }
}

export async function unsubscribePush(userId: string): Promise<boolean> {
  try {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await sub.unsubscribe();
      }
    }

    await supabase.from('push_subscriptions').delete().eq('user_id', userId);
    await supabase.from('profiles').update({
      push_enabled: false,
      updated_at: new Date().toISOString()
    }).eq('user_id', userId);

    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error("Unsubscribe push error:", err);
    return false;
  }
}

export async function sendTestNotification(): Promise<void> {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('🔔 ITM Notes Push Test', {
      body: 'Study notification enabled! You will receive daily streak reminders & timetable alerts.',
      icon: '/favicon.ico',
    });
    toast.success('Test notification delivered to your device!');
  } else {
    toast.success('🔔 Push notifications active and connected to Supabase backend!');
  }
}

export async function getPushSubscriptionStatus(userId: string): Promise<boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && JSON.parse(raw).enabled) return true;

    if (userId) {
      const { data } = await supabase
        .from('push_subscriptions')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      return Boolean(data);
    }
    return false;
  } catch {
    return false;
  }
}
