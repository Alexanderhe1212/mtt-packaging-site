export function trackEvent(name: string, parameters: Record<string, string> = {}) {
  try {
    if (localStorage.getItem('mtt_cookie_consent') !== 'granted') return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', name, { transport_type: 'beacon', page_path: location.pathname, ...parameters });
  } catch { /* Analytics must never block an enquiry. */ }
}
