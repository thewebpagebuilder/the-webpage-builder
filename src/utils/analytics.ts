/**
 * Pluggable Analytics & Tracking Utility
 * 
 * In development mode, page views and event logs are formatted and printed to the developer console.
 * In production mode, you can easily plug in Google Analytics (gtag), PostHog, Mixpanel, or other services.
 */

export function trackPageView(path: string) {
  if (import.meta.env.DEV) {
    console.log(
      `%c[Analytics] PageView%c: ${path}`,
      "color: #10b981; font-weight: bold; background-color: rgba(16, 185, 129, 0.08); padding: 2px 6px; border-radius: 4px;",
      "color: inherit;"
    );
  }

  // GA4 plug-in example:
  // if (typeof window !== "undefined" && (window as any).gtag) {
  //   (window as any).gtag("config", "G-XXXXXXXXXX", { page_path: path });
  // }

  // PostHog plug-in example:
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture("$pageview", { $current_url: window.location.href });
  // }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.log(
      `%c[Analytics] Event%c: ${eventName}`,
      "color: #3b82f6; font-weight: bold; background-color: rgba(59, 130, 246, 0.08); padding: 2px 6px; border-radius: 4px;",
      "color: inherit;",
      properties || ""
    );
  }

  // GA4 plug-in example:
  // if (typeof window !== "undefined" && (window as any).gtag) {
  //   (window as any).gtag("event", eventName, properties);
  // }

  // PostHog plug-in example:
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture(eventName, properties);
  // }
}
