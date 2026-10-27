import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { useNavigate, useLocation } from 'react-router-dom';

export function useCapacitorNative() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // Configure Status Bar
    const configureStatusBar = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        // Prevent WebView from overlaying under the status bar / camera cutout
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setBackgroundColor({ color: '#18181B' });
      } catch (e) {
        console.warn('StatusBar error:', e);
      }
    };

    // Hide Splash Screen with smooth fade out
    const hideSplash = async () => {
      try {
        await SplashScreen.hide({
          fadeOutDuration: 400,
        });
      } catch (e) {
        console.warn('SplashScreen error:', e);
      }
    };

    configureStatusBar();
    hideSplash();

    // Handle Android Hardware Back Button
    const backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (location.pathname === '/' || location.pathname === '/dashboard') {
        CapacitorApp.minimizeApp();
      } else if (canGoBack) {
        navigate(-1);
      } else {
        CapacitorApp.minimizeApp();
      }
    });

    return () => {
      backButtonListener.then((listener) => listener.remove()).catch(() => {});
    };
  }, [navigate, location]);
}
