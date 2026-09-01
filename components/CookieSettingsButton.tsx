'use client';

export default function CookieSettingsButton() {
  return (
    <button
      className="footer-cookie-btn"
      onClick={() => window.dispatchEvent(new Event('reopen-cookie-consent'))}
    >
      Cookie Settings
    </button>
  );
}
