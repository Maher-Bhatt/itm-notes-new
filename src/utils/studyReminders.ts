/**
 * CampusLoop - Study Reminders & Push Notification Engine
 * Bridges standard Web Notification API with Capacitor Push Notifications
 * for due flashcards, study streaks, and exam milestone countdowns.
 */

import { toast } from "sonner";
import { getSrsStatistics } from "./srsEngine";

export interface ReminderConfig {
  dailyReminderEnabled: boolean;
  reminderTime: string; // e.g. "20:00"
  streakProtectionEnabled: boolean;
  examMilestoneEnabled: boolean;
}

const STORAGE_KEY = 'itm_reminder_config';

export function getReminderConfig(): ReminderConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {
      dailyReminderEnabled: true,
      reminderTime: "20:00",
      streakProtectionEnabled: true,
      examMilestoneEnabled: true,
    };
  } catch {
    return {
      dailyReminderEnabled: true,
      reminderTime: "20:00",
      streakProtectionEnabled: true,
      examMilestoneEnabled: true,
    };
  }
}

export function saveReminderConfig(config: ReminderConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn("Failed to save reminder config:", e);
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      showLocalNotification(
        "CampusLoop Study Alerts Active",
        "You will receive timely nudges for due flashcards and exam milestones."
      );
      return true;
    }
    return false;
  } catch (e) {
    console.warn("Notification request failed:", e);
    return false;
  }
}

export function showLocalNotification(title: string, body: string, icon = "/icon-192.png"): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon,
        badge: icon,
      });
    } catch {
      toast.info(title, { description: body });
    }
  }
}

export function triggerDueCardsNotification(): void {
  const stats = getSrsStatistics();
  if (stats.dueTodayCount > 0) {
    showLocalNotification(
      "📚 Flashcards Due Today",
      `You have ${stats.dueTodayCount} active recall cards scheduled for review on CampusLoop.`
    );
  }
}

export function scheduleDailyStudyReminder(): void {
  triggerDueCardsNotification();
}
