'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Premium interactive calculator showcase for the homepage.
 *
 * Static preview with a one-time entrance animation:
 *   product dimensions → internal result → "Your Packaging Plan"
 *
 * Respects prefers-reduced-motion.
 * Links entirely to /tools/box-size-calculator.
 */
export default function CalcShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0); // 0=hidden, 1=product, 2=result, 3=plan

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (prefersReduced) {
            setPhase(3);
            return;
          }
          // Staggered reveal: product → result → plan
          setTimeout(() => setPhase(1), 100);
          setTimeout(() => setPhase(2), 500);
          setTimeout(() => setPhase(3), 900);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v2-calc-showcase" ref={ref}>
      <div className="v2-calc-showcase-grid">
        {/* Left: Value Proposition */}
        <div className="v2-calc-showcase-copy">
          <p className="section-kicker">Free Packaging Planning Tool</p>
          <h2>
            Start with your product.<br />
            We&apos;ll help size the packaging.
          </h2>
          <p className="v2-calc-showcase-desc">
            Enter your product dimensions and get an instant packaging size estimate
            — including internal size, external size, material planning and shipping volume.
          </p>
          <a className="button v2-calc-showcase-cta" href="/tools/box-size-calculator">
            Calculate My Packaging
          </a>
          <p className="v2-calc-showcase-reassure">No sign-up. No commitment. Free to use.</p>

          <div className="v2-calc-showcase-benefits">
            <div className="v2-calc-showcase-benefit">
              <span className="v2-calc-showcase-benefit-dot" />
              <div>
                <strong>Instant Estimate</strong>
                <span>No email required.</span>
              </div>
            </div>
            <div className="v2-calc-showcase-benefit">
              <span className="v2-calc-showcase-benefit-dot" />
              <div>
                <strong>Packaging-Aware</strong>
                <span>Built for custom packaging projects.</span>
              </div>
            </div>
            <div className="v2-calc-showcase-benefit">
              <span className="v2-calc-showcase-benefit-dot" />
              <div>
                <strong>Quote Ready</strong>
                <span>Send your plan directly to MTT.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calculator Preview */}
        <a href="/tools/box-size-calculator" className="v2-calc-preview" aria-label="Open MTT Packaging Calculator">
          <div className="v2-calc-preview-card">
            {/* Calculator header */}
            <div className="v2-calc-preview-header">
              <span className="v2-calc-preview-badge">MTT</span>
              <span className="v2-calc-preview-title">PACKAGING CALCULATOR</span>
            </div>

            {/* Product size inputs */}
            <div className="v2-calc-preview-section">
              <span className="v2-calc-preview-label">PRODUCT SIZE</span>
              <div className="v2-calc-preview-dims">
                <div className="v2-calc-preview-dim">
                  <span className="v2-calc-preview-dim-val" style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(6px)' }}>120</span>
                  <span className="v2-calc-preview-dim-label">Length</span>
                </div>
                <span className="v2-calc-preview-x">×</span>
                <div className="v2-calc-preview-dim">
                  <span className="v2-calc-preview-dim-val" style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(6px)', transitionDelay: '80ms' }}>80</span>
                  <span className="v2-calc-preview-dim-label">Width</span>
                </div>
                <span className="v2-calc-preview-x">×</span>
                <div className="v2-calc-preview-dim">
                  <span className="v2-calc-preview-dim-val" style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(6px)', transitionDelay: '160ms' }}>45</span>
                  <span className="v2-calc-preview-dim-label">Height</span>
                </div>
                <span className="v2-calc-preview-unit">mm</span>
              </div>
            </div>

            {/* Packaging type chips */}
            <div className="v2-calc-preview-section">
              <span className="v2-calc-preview-label">PACKAGING</span>
              <div className="v2-calc-preview-chips">
                <span className="v2-calc-preview-chip v2-calc-preview-chip-active">Rigid Box</span>
                <span className="v2-calc-preview-chip">Folding Carton</span>
              </div>
            </div>

            {/* Divider */}
            <div className="v2-calc-preview-divider" style={{ opacity: phase >= 2 ? 1 : 0 }} />

            {/* Result */}
            <div className="v2-calc-preview-result" style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)' }}>
              <span className="v2-calc-preview-label">YOUR PACKAGING PLAN</span>
              <span className="v2-calc-preview-result-dims">
                126 <span className="v2-calc-preview-result-sep">×</span> 86 <span className="v2-calc-preview-result-sep">×</span> 51 <span className="v2-calc-preview-result-unit">mm</span>
              </span>
              <span className="v2-calc-preview-result-sub">Recommended Internal Size</span>
            </div>

            {/* CTA */}
            <div className="v2-calc-preview-cta" style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(6px)' }}>
              <span>Calculate My Packaging →</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
