'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const WHATSAPP_NUMBER = '8617207110964';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyeyzwpw';

type Step =
  | 'closed'
  | 'intro'
  | 'packaging'
  | 'quantity'
  | 'moq-block'
  | 'budget'
  | 'market'
  | 'stage'
  | 'name'
  | 'email'
  | 'details'
  | 'summary'
  | 'submitting'
  | 'success'
  | 'error';

interface Answers {
  packaging: string;
  quantity: string;
  budget: string;
  market: string;
  stage: string;
  name: string;
  email: string;
  details: string;
}

const PACKAGING_OPTIONS = [
  'Custom Rigid Box',
  'Folding Carton',
  'Paper Bag',
  'Custom Insert',
  'Perfume / Fragrance Packaging',
  'Cosmetics / Skincare Packaging',
  'Gift Set / PR Kit Packaging',
  'Not Sure Yet',
];

const QUANTITY_OPTIONS = [
  'Below 500 pcs',
  '500–999 pcs',
  '1,000–4,999 pcs',
  '5,000–9,999 pcs',
  '10,000+ pcs',
  'Not Sure Yet',
];

const BUDGET_OPTIONS = [
  'Below USD 1,000',
  'USD 1,000–3,000',
  'USD 3,000–10,000',
  'USD 10,000+',
  'Not Sure Yet',
];

const STAGE_OPTIONS = [
  'Ready for Quotation',
  'Need Packaging Design / Structure Advice',
  'Need a Physical Sample',
  'Comparing Suppliers',
  'Early Planning Stage',
];

const STEP_NUMBER: Record<Exclude<Step, 'closed' | 'intro' | 'moq-block' | 'summary' | 'submitting' | 'success' | 'error'>, number> = {
  packaging: 1,
  quantity: 2,
  budget: 3,
  market: 4,
  stage: 5,
  name: 6,
  email: 7,
  details: 8,
};

const TOTAL_STEPS = 8;

export default function LeadQualificationChatbot() {
  const [step, setStep] = useState<Step>('closed');
  const [answers, setAnswers] = useState<Answers>({
    packaging: '',
    quantity: '',
    budget: '',
    market: '',
    stage: '',
    name: '',
    email: '',
    details: '',
  });
  const [showGreeting, setShowGreeting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Show greeting badge after delay
  useEffect(() => {
    if (step !== 'closed') return;
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [step]);

  // Auto-scroll to bottom on step change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  // Focus input when relevant step opens
  useEffect(() => {
    if (step === 'market' || step === 'name' || step === 'email' || step === 'details') {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [step]);

  const openChat = useCallback(() => {
    setShowGreeting(false);
    setStep('intro');
  }, []);

  const closeChat = useCallback(() => {
    setStep('closed');
  }, []);

  // Track analytics if gtag is available
  const trackEvent = useCallback((name: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', name);
    }
  }, []);

  const selectOption = useCallback(
    (field: keyof Answers, value: string, nextStep: Step) => {
      setAnswers((prev) => ({ ...prev, [field]: value }));
      setInputValue('');
      setStep(nextStep);
    },
    [],
  );

  const submitText = useCallback(
    (field: keyof Answers, nextStep: Step) => {
      if (!inputValue.trim()) return;
      if (field === 'email') {
        const trimmed = inputValue.trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        if (!emailOk) {
          setEmailError('Please enter a valid email address.');
          return;
        }
        setEmailError('');
      }
      setAnswers((prev) => ({ ...prev, [field]: inputValue.trim() }));
      setInputValue('');
      setStep(nextStep);
    },
    [inputValue],
  );

  const submitEnquiry = useCallback(async () => {
    setStep('submitting');

    const details = [
      `NEW WEBSITE CHATBOT ENQUIRY`,
      ``,
      `Name: ${answers.name}`,
      `Email: ${answers.email}`,
      `Packaging Type: ${answers.packaging}`,
      `Quantity: ${answers.quantity}`,
      `Estimated Budget: ${answers.budget}`,
      `Country / Market: ${answers.market}`,
      `Project Stage: ${answers.stage}`,
      answers.details ? `\nProject Details:\n${answers.details}` : '',
      ``,
      `Lead Source: Website Chatbot`,
      `Page URL: ${typeof window !== 'undefined' ? window.location.href : ''}`,
    ]
      .filter(Boolean)
      .join('\n');

    const formData = new FormData();
    formData.append('_subject', 'Website Chatbot Enquiry');
    formData.append('name', answers.name);
    formData.append('email', answers.email);
    formData.append('packagingType', answers.packaging);
    formData.append('quantity', answers.quantity);
    formData.append('country', answers.market);
    formData.append('company', '');
    formData.append('message', details);
    formData.append('leadSource', 'Website Chatbot');
    formData.append('pageUrl', typeof window !== 'undefined' ? window.location.href : '');
    formData.append('pageTitle', typeof document !== 'undefined' ? document.title : '');
    formData.append('submissionTime', new Date().toISOString());

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        trackEvent('chatbot_submitted');
        setStep('success');
      } else {
        setStep('error');
      }
    } catch {
      setStep('error');
    }
  }, [answers]);

  const buildWhatsAppUrl = useCallback(() => {
    let msg = `Hi MTT Packaging,\n\nI submitted a packaging enquiry through your website.\n\n`;
    msg += `Name: ${answers.name}\n`;
    msg += `Email: ${answers.email}\n`;
    msg += `Packaging: ${answers.packaging}\n`;
    msg += `Quantity: ${answers.quantity}\n`;
    msg += `Budget: ${answers.budget}\n`;
    msg += `Market: ${answers.market}\n`;
    msg += `Project stage: ${answers.stage}\n`;
    if (answers.details) {
      msg += `\nProject details:\n${answers.details}\n`;
    }
    msg += `\nI'd like to continue discussing my packaging project.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [answers]);

  const handleEdit = useCallback(() => {
    setStep('packaging');
  }, []);

  const handleStartOver = useCallback(() => {
    setAnswers({
      packaging: '',
      quantity: '',
      budget: '',
      market: '',
      stage: '',
      name: '',
      email: '',
      details: '',
    });
    setInputValue('');
    setEmailError('');
    setStep('intro');
  }, []);

  if (step === 'closed') {
    return (
      <div className="chatbot-widget">
        {showGreeting && (
          <div className="chatbot-greeting" role="status">
            <span>Need custom packaging? Let&apos;s check your project.</span>
            <button
              onClick={() => setShowGreeting(false)}
              aria-label="Dismiss greeting"
              className="chatbot-greeting-close"
            >
              ×
            </button>
          </div>
        )}
        <button
          className="chatbot-launcher"
          onClick={openChat}
          aria-label="Talk to MTT Packaging"
        >
          <span className="chatbot-launcher-mtt">MTT</span>
          <span className="chatbot-launcher-text">Talk to MTT Packaging</span>
        </button>
      </div>
    );
  }

  return (
    <div className="chatbot-widget chatbot-open" role="dialog" aria-label="MTT Packaging Assistant">
      {/* Header */}
      <div className="chatbot-header">
        <div>
          <b>MTT Packaging Assistant</b>
          <span>Custom Packaging Project Check</span>
        </div>
        <button onClick={closeChat} aria-label="Close chatbot" className="chatbot-close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      {step !== 'intro' && step !== 'moq-block' && step !== 'summary' && step !== 'submitting' && step !== 'success' && step !== 'error' && (
        <div className="chatbot-progress">
          Step {STEP_NUMBER[step as keyof typeof STEP_NUMBER]} of {TOTAL_STEPS}
        </div>
      )}

      {/* Body */}
      <div className="chatbot-body">
        {/* Intro */}
        {step === 'intro' && (
          <div className="chatbot-step">
            <div className="chatbot-message">
              <p>Hi 👋 Welcome to MTT Packaging.</p>
              <p>We manufacture custom packaging for brand production projects.</p>
              <p>I&apos;ll ask a few quick questions to help check whether your project fits our production service.</p>
            </div>
            <button className="chatbot-btn" onClick={() => { trackEvent('chatbot_start'); setStep('packaging'); }}>
              Start Project Check
            </button>
          </div>
        )}

        {/* Q1: Packaging Type */}
        {step === 'packaging' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What type of packaging are you looking for?</div>
            <div className="chatbot-options">
              {PACKAGING_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`chatbot-btn ${answers.packaging === opt ? 'chatbot-btn-active' : ''}`}
                  onClick={() => selectOption('packaging', opt, 'quantity')}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q2: Quantity */}
        {step === 'quantity' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What quantity do you need per design?</div>
            <div className="chatbot-options">
              {QUANTITY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`chatbot-btn ${answers.quantity === opt ? 'chatbot-btn-active' : ''}`}
                  onClick={() => {
                    if (opt === 'Below 500 pcs') {
                      setAnswers((prev) => ({ ...prev, quantity: opt }));
                      trackEvent('chatbot_moq_below_500');
                      setStep('moq-block');
                    } else {
                      selectOption('quantity', opt, 'budget');
                    }
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MOQ Block */}
        {step === 'moq-block' && (
          <div className="chatbot-step">
            <div className="chatbot-message">
              <p>Thanks for checking with us.</p>
              <p>
                Our custom production typically starts from{' '}
                <strong>500 pieces per design</strong>.
              </p>
              <p>If your quantity can reach 500 pieces, we&apos;d be happy to discuss the project.</p>
            </div>
            <div className="chatbot-options">
              <button
                className="chatbot-btn"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, quantity: '500+ (confirmed from below 500)' }));
                  setStep('budget');
                }}
              >
                My Quantity Can Reach 500 pcs
              </button>
              <button className="chatbot-btn chatbot-btn-secondary" onClick={closeChat}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Q3: Budget */}
        {step === 'budget' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What is your estimated packaging budget?</div>
            <div className="chatbot-options">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`chatbot-btn ${answers.budget === opt ? 'chatbot-btn-active' : ''}`}
                  onClick={() => selectOption('budget', opt, 'market')}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q4: Market */}
        {step === 'market' && (
          <div className="chatbot-step">
            <div className="chatbot-question">Where will the packaging be used or delivered?</div>
            <div className="chatbot-input-wrap">
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                className="chatbot-input"
                placeholder="Country or market, e.g. Germany"
                maxLength={80}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitText('market', 'stage');
                }}
              />
              <button
                className="chatbot-btn chatbot-btn-send"
                onClick={() => submitText('market', 'stage')}
                disabled={!inputValue.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Q5: Project Stage */}
        {step === 'stage' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What stage is your project at?</div>
            <div className="chatbot-options">
              {STAGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  className={`chatbot-btn ${answers.stage === opt ? 'chatbot-btn-active' : ''}`}
                  onClick={() => selectOption('stage', opt, 'name')}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q6: Name */}
        {step === 'name' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What should we call you?</div>
            <div className="chatbot-input-wrap">
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                className="chatbot-input"
                placeholder="Your name"
                maxLength={60}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitText('name', 'email');
                }}
              />
              <button
                className="chatbot-btn chatbot-btn-send"
                onClick={() => submitText('name', 'email')}
                disabled={!inputValue.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Q7: Email — required */}
        {step === 'email' && (
          <div className="chatbot-step">
            <div className="chatbot-question">What is your email address?</div>
            <div className="chatbot-input-wrap">
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="email"
                className="chatbot-input"
                placeholder="you@company.com"
                maxLength={120}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setEmailError(''); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitText('email', 'details');
                }}
                aria-label="Email address"
                required
              />
              {emailError && <p className="chatbot-error">{emailError}</p>}
              <button
                className="chatbot-btn chatbot-btn-send"
                onClick={() => submitText('email', 'details')}
                disabled={!inputValue.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Q8: Optional Details */}
        {step === 'details' && (
          <div className="chatbot-step">
            <div className="chatbot-question">Anything else we should know?</div>
            <p className="chatbot-hint">
              Product dimensions, materials, finishes, insert needs, target budget, deadline, or other requirements...
            </p>
            <div className="chatbot-input-wrap">
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                className="chatbot-textarea"
                placeholder="Optional — share any details"
                maxLength={800}
                rows={3}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="chatbot-details-actions">
                <button
                  className="chatbot-btn chatbot-btn-send"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, details: inputValue.trim() }));
                    setInputValue('');
                    trackEvent('chatbot_completed');
                    setStep('summary');
                  }}
                >
                  Continue
                </button>
                <button
                  className="chatbot-btn chatbot-btn-secondary"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, details: '' }));
                    setInputValue('');
                    trackEvent('chatbot_completed');
                    setStep('summary');
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {step === 'summary' && (
          <div className="chatbot-step">
            <div className="chatbot-summary-title">Your Project Summary</div>
            <dl className="chatbot-summary">
              <dt>Name</dt>
              <dd>{answers.name}</dd>
              <dt>Email</dt>
              <dd>{answers.email}</dd>
              <dt>Packaging Type</dt>
              <dd>{answers.packaging}</dd>
              <dt>Quantity</dt>
              <dd>{answers.quantity}</dd>
              <dt>Estimated Budget</dt>
              <dd>{answers.budget}</dd>
              <dt>Country / Market</dt>
              <dd>{answers.market}</dd>
              <dt>Project Stage</dt>
              <dd>{answers.stage}</dd>
              {answers.details && (
                <>
                  <dt>Project Details</dt>
                  <dd>{answers.details}</dd>
                </>
              )}
            </dl>
            <p className="chatbot-privacy">
              By submitting, you agree that MTT Packaging may contact you about this packaging project.
            </p>
            <button className="chatbot-btn chatbot-btn-submit" onClick={submitEnquiry}>
              Submit Enquiry
            </button>
            <div className="chatbot-summary-actions">
              <button className="chatbot-btn chatbot-btn-secondary" onClick={handleEdit}>
                Edit Answers
              </button>
            </div>
          </div>
        )}

        {/* Submitting */}
        {step === 'submitting' && (
          <div className="chatbot-step chatbot-center">
            <div className="chatbot-spinner" />
            <p className="chatbot-message">Sending your enquiry...</p>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="chatbot-step">
            <div className="chatbot-success-icon">✓</div>
            <div className="chatbot-question">Thank You — We&apos;ve Received Your Project Details</div>
            <div className="chatbot-message">
              <p>Your enquiry has been sent to MTT Packaging. You can also continue directly on WhatsApp for a faster conversation.</p>
            </div>
            <a
              className="chatbot-btn chatbot-btn-whatsapp"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('chatbot_whatsapp_click')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continue on WhatsApp
            </a>
            <button className="chatbot-btn chatbot-btn-secondary" onClick={closeChat}>
              Close
            </button>
          </div>
        )}

        {/* Error */}
        {step === 'error' && (
          <div className="chatbot-step">
            <div className="chatbot-question">We couldn&apos;t send your enquiry automatically.</div>
            <div className="chatbot-message">
              <p>Please try again or continue with us on WhatsApp.</p>
            </div>
            <button className="chatbot-btn" onClick={submitEnquiry}>
              Try Again
            </button>
            <a
              className="chatbot-btn chatbot-btn-whatsapp"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continue on WhatsApp
            </a>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
