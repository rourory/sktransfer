export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag("event", name, params);
  }

  // Yandex Metrika
  if ((window as any).ym && process.env.NEXT_PUBLIC_YM_COUNTER_ID) {
    (window as any).ym(
      Number(process.env.NEXT_PUBLIC_YM_COUNTER_ID),
      "reachGoal",
      name,
      params
    );
  }
}