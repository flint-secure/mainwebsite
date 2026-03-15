import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";
import { clarity } from "@microsoft/clarity";

/**
 * Unified event tracking for Firebase Analytics and Microsoft Clarity.
 * 
 * @param eventName - The name of the event to track.
 * @param params - Optional parameters associated with the event.
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  // Firebase Analytics
  try {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (err) {
    console.error("Firebase logEvent failed:", err);
  }

  // Microsoft Clarity
  try {
    // Clarity uses 'event' for custom events
    // We can also pass params as custom properties if needed, 
    // though Clarity's standard event call is clarity("event", name)
    clarity.event(eventName);
    
    // If there are specific params we want to track as tags/properties
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        clarity.set(key, String(value));
      });
    }
  } catch (err) {
    console.error("Clarity event/set failed:", err);
  }
};

/**
 * Set custom tags/properties in Clarity.
 * 
 * @param key - The tag key.
 * @param value - The tag value.
 */
export const setAnalyticsTag = (key: string, value: string) => {
  if (typeof window === "undefined") return;

  try {
    clarity.set(key, value);
  } catch (err) {
    console.error("Clarity set tag failed:", err);
  }
};
