'use client';

import { useEffect, useRef, useState } from 'react';
import MTTMonogram from './MTTMonogram';

export default function HugoContactWidget({ hasIntroVideo, whatsappNumber, onProjectCheck }: { hasIntroVideo: boolean; whatsappNumber: string; onProjectCheck: () => void }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const autoOpenHandled = useRef(false);
  const close = () => { setOpen(false); launcher.current?.focus(); };
  useEffect(() => {
    if (open) {
      autoOpenHandled.current = true;
      setPrompt(false);
      try { sessionStorage.setItem('mtt_hugo_opened', '1'); } catch { /* Keep working when storage is unavailable. */ }
      return;
    }
    if (autoOpenHandled.current) return;
    try { if (sessionStorage.getItem('mtt_hugo_opened')) { autoOpenHandled.current = true; return; } } catch { /* Use the current visit in memory. */ }
    const timer = window.setTimeout(() => {
      autoOpenHandled.current = true;
      try { sessionStorage.setItem('mtt_hugo_opened', '1'); } catch { /* Session storage is optional. */ }
      if (window.matchMedia('(max-width: 600px)').matches) setPrompt(true);
      else setOpen(true);
    }, 10_000);
    return () => window.clearTimeout(timer);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    if (document.activeElement === launcher.current) closeButton.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); launcher.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  return <div className="hugo-widget">
    {open && <section id="hugo-contact-panel" className="hugo-panel" role="dialog" aria-label="Talk to Hugo">
      <button ref={closeButton} type="button" className="hugo-close" aria-label="Close Hugo contact panel" onClick={close}>×</button>
      <div className="hugo-video">
        {hasIntroVideo && !videoFailed ? <>
          <video ref={video} src="/video/hugo-intro.mp4" autoPlay muted={muted} loop playsInline preload="metadata" onError={() => setVideoFailed(true)} onPause={() => setPaused(true)} onPlay={() => setPaused(false)} aria-label="Hugo introduction" />
          <div className="hugo-video-controls">
            <button type="button" aria-label={muted ? 'Turn sound on' : 'Mute introduction video'} aria-pressed={!muted} onClick={() => { setMuted(!muted); if (video.current?.paused) void video.current.play().catch(() => setPaused(true)); }}>{muted ? 'Sound on' : 'Mute'}</button>
            <button type="button" aria-label={paused ? 'Play introduction video' : 'Pause introduction video'} onClick={() => { if (video.current) { if (paused) void video.current.play().catch(() => setPaused(true)); else video.current.pause(); } }}>{paused ? 'Play' : 'Pause'}</button>
          </div>
        </> : <div className="hugo-fallback" aria-label="MTT Packaging"><MTTMonogram size={80} /><span>MTT Packaging</span></div>}
      </div>
      <div className="hugo-content">
        <h2>Hi, I’m Hugo.</h2>
        <p className="hugo-message">Let’s talk about your packaging.</p>
        <div className="hugo-actions">
          <a className="hugo-action hugo-primary" href="/request-a-quote">Send your brief <span aria-hidden="true">→</span></a>
          <a className="hugo-action" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Hugo, I found MTT Packaging online and would like to discuss a custom packaging project.')}`} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
        <button type="button" className="hugo-project" onClick={onProjectCheck}>Help me get started →</button>
      </div>
    </section>}
    <button ref={launcher} type="button" className="hugo-launcher" aria-label="Talk to Hugo" aria-expanded={open} aria-controls="hugo-contact-panel" onClick={() => { if (open) close(); else { setPaused(false); setMuted(true); setOpen(true); } }}><span className="hugo-avatar"><MTTMonogram size={30} /><i aria-hidden="true" /></span><span className={prompt ? "hugo-prompt" : undefined}>{prompt ? "Need packaging help?" : "Talk to Hugo"}</span></button>
  </div>;
}
