'use client';
import { useEffect, useState } from 'react';

// A prior GA-only choice must not silently authorize session recordings.
const STORAGE_KEY = 'mtt_cookie_consent_v2';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* Storage optional. */ }
    const gpc = Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
    setPrivacySignal(gpc);
    setAnalyticsEnabled(stored === 'granted' && !gpc);
    if (stored === 'granted') {
      if (typeof window !== 'undefined' && 'mttGrantAnalytics' in window) {
        (window as unknown as { mttGrantAnalytics: () => void }).mttGrantAnalytics();
      }
    }
    if (!stored) setVisible(true);

    const reopen = () => { setVisible(true); setShowPrefs(true); };
    const syncChoice = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      setAnalyticsEnabled(event.newValue === 'granted' && !gpc);
      if (event.newValue !== 'granted') (window as unknown as { mttRevokeAnalytics?: () => void }).mttRevokeAnalytics?.();
    };
    window.addEventListener('reopen-cookie-consent', reopen);
    window.addEventListener('storage', syncChoice);
    return () => { window.removeEventListener('reopen-cookie-consent', reopen); window.removeEventListener('storage', syncChoice); };
  }, []);

  const accept = () => {
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) { reject(); return; }
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch { /* Storage optional. */ }
    setAnalyticsEnabled(true);
    if (typeof window !== 'undefined' && 'mttGrantAnalytics' in window) {
      (window as unknown as { mttGrantAnalytics: () => void }).mttGrantAnalytics();
    }
    setVisible(false);
    setShowPrefs(false);
  };

  const reject = () => {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch { /* Storage optional. */ }
    setAnalyticsEnabled(false);
    (window as unknown as { mttRevokeAnalytics?: () => void }).mttRevokeAnalytics?.();
    setVisible(false);
    setShowPrefs(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      {!showPrefs ? (
        <>
          <div className="cookie-banner-text">
            <b>Your Privacy Choices</b>
            <p>With your permission, Google Analytics measures website use and Microsoft Clarity provides heatmaps and session recordings. Enquiry content is masked and recording stops when you enter a form or open project chat. Advertising consent stays off. <a href="/cookie-policy">Cookie Policy</a> · <a href="/privacy-policy">Privacy Policy</a></p>
            {privacySignal && <p>Your browser privacy signal is enabled. Analytics stays off.</p>}
          </div>
          <div className="cookie-banner-actions">
            {!privacySignal && <button className="cookie-btn cookie-btn-accept" onClick={accept}>Accept Analytics</button>}
            <button className="cookie-btn cookie-btn-reject" onClick={reject}>Reject Non-Essential</button>
            <button className="cookie-btn cookie-btn-manage" onClick={() => setShowPrefs(true)}>Manage Preferences</button>
          </div>
        </>
      ) : (
        <div className="cookie-prefs">
          <b>Cookie Preferences</b>
          <div className="cookie-pref-row">
            <div><b>Strictly Necessary</b><p>Required for the website to function. Cannot be disabled.</p></div>
            <span className="cookie-pref-status">Always On</span>
          </div>
          <div className="cookie-pref-row">
            <div><b>Analytics</b><p>Google Analytics and Microsoft Clarity help us improve the website. You can withdraw at any time. If you re-enable analytics after withdrawal, session recording resumes on your next eligible page visit. <a href="/cookie-policy">Details</a></p></div>
            <button className={`cookie-toggle${analyticsEnabled ? ' cookie-toggle-on' : ''}`} onClick={() => setAnalyticsEnabled(!analyticsEnabled)} aria-pressed={analyticsEnabled} disabled={privacySignal}>
              {analyticsEnabled ? 'On' : 'Off'}
            </button>
          </div>
          {privacySignal && <p>Your browser privacy signal keeps analytics off.</p>}
          <div className="cookie-prefs-actions">
            <button className="cookie-btn cookie-btn-accept" onClick={analyticsEnabled ? accept : reject}>Save Preferences</button>
            <button className="cookie-btn cookie-btn-manage" onClick={() => setShowPrefs(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
