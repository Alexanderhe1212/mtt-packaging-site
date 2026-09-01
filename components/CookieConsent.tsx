'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mtt_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      if (typeof window !== 'undefined' && 'mttGrantAnalytics' in window) {
        (window as unknown as { mttGrantAnalytics: () => void }).mttGrantAnalytics();
      }
    }
    if (!stored) setVisible(true);

    const reopen = () => { setVisible(true); setShowPrefs(true); };
    window.addEventListener('reopen-cookie-consent', reopen);
    return () => window.removeEventListener('reopen-cookie-consent', reopen);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    if (typeof window !== 'undefined' && 'mttGrantAnalytics' in window) {
      (window as unknown as { mttGrantAnalytics: () => void }).mttGrantAnalytics();
    }
    setVisible(false);
    setShowPrefs(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
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
            <p>We use necessary technologies to operate this website and, with your permission, analytics technologies to understand how visitors use MTT Packaging.</p>
          </div>
          <div className="cookie-banner-actions">
            <button className="cookie-btn cookie-btn-accept" onClick={accept}>Accept Analytics</button>
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
            <div><b>Analytics</b><p>Helps us understand how visitors use MTT Packaging so we can improve the website.</p></div>
            <button className={`cookie-toggle${localStorage.getItem(STORAGE_KEY) === 'granted' ? ' cookie-toggle-on' : ''}`} onClick={() => { if (localStorage.getItem(STORAGE_KEY) === 'granted') { localStorage.removeItem(STORAGE_KEY); } else { accept(); } }}>
              {localStorage.getItem(STORAGE_KEY) === 'granted' ? 'On' : 'Off'}
            </button>
          </div>
          <div className="cookie-prefs-actions">
            <button className="cookie-btn cookie-btn-accept" onClick={accept}>Save Preferences</button>
            <button className="cookie-btn cookie-btn-manage" onClick={() => setShowPrefs(false)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
