# MTT measurement and enquiry verification

Reviewed against source on 26 October 2026. This replaces the obsolete August architecture-only note. Private dashboard observations, customer submissions and dated metrics are kept in the operations evidence directory, not this public repository.

## Implementation and verification boundaries

The site has GA4 configured with public measurement ID `G-Z132GJZZ57` in `lib/analytics-bootstrap.mjs`, inserted by `app/layout.tsx`. `CookieConsent` controls opt-in and withdrawal. The presence of this tag proves implementation, not current reporting access, event receipt or a completed commercial enquiry.

Both analytics vendors remain unloaded before opt-in. GA4 event calls in `lib/analytics.ts` require the current consent choice. Advertising consent stays denied. Clarity has additional page, URL and form-interaction exclusions. Existing consent tests cover rejection, withdrawal and cross-tab changes; do not weaken these controls to increase measured traffic.

A backend-accepted form, an analytics event, a delivered notification email, a verified buyer and a qualified enquiry are separate facts. Google documents `generate_lead` as a lead-generation event; MTT emits it only after the standard enquiry endpoint confirms acceptance.[1] Do not count clicks or the thank-you page alone as qualified enquiries.

## Event dictionary

| Event | Actual trigger | Interpretation |
|---|---|---|
| `page_view` | GA tag configuration after consent | Measured visit; not all visitors consent |
| `packaging_brief_click` | Click to English/Chinese quote page | Intent action, not submission |
| `quote_start` | First focus inside a standard enquiry form on that document, with consent | Form start; reloads may create another start |
| `generate_lead` | Standard form gets successful HTTP response and JSON `ok: true` | Endpoint accepted; `form_id` is `homepage` or `request_a_quote` |
| `quote_error` | Standard form cannot confirm acceptance | Retry/error; not a lead |
| `whatsapp_click`, `email_click` | Contact link click | Opens a contact route; does not prove a message or reply |
| `gift_builder_entry` | Click to the studio route | Entry intent |
| `gift_builder_start` | First studio step transition | Started using the embedded studio |
| `gift_builder_solution_selected` | Choose a box structure | Structure selected |
| `gift_builder_design_completed` | Open the studio quote step | Historical event name; does not certify design completion or engineering approval |
| `gift_builder_email_submit` | Studio endpoint confirms accepted JSON | Studio brief accepted, not delivered email |
| `gift_builder_whatsapp_click` | Studio WhatsApp link click | Opens a draft; not a conversation |
| `chatbot_start`, `chatbot_completed` | Start guided questions / reach the questionnaire summary | Questionnaire progress, not backend acceptance |
| `chatbot_submitted` | Chatbot endpoint confirms successful HTTP response and JSON `ok: true` | Chatbot submission accepted |
| `chatbot_whatsapp_click` | Chatbot WhatsApp handoff | Contact intent |
| `chatbot_moq_below_1000` | Select quantity below the standard MOQ | Qualification signal, not an accepted lead |

The studio forwards allowlisted events to its same-origin parent. Its full-screen `app.html` has no analytics bridge; do not assume those standalone visits are measured like embedded visits. `generate_lead`, `gift_builder_email_submit` and `chatbot_submitted` are separate event names, not three counts of the same form. Current GA key-event settings and receipt must be checked in the property; they are not configured by this document. Enhanced-measurement events such as `form_start` are distinct from the custom `quote_start`.

## Enquiry source fields

All public enquiry routes use the existing Formspree endpoint `https://formspree.io/f/xyeyzwpw`. Preserve its acceptance, retry and draft behavior.

| Enquiry route | Source carried in the submission |
|---|---|
| Homepage form | `lead_source=homepage_quote`; `submission_page=/` |
| Ordinary English quote form | `lead_source=quote_page`; current path in `submission_page` |
| Calculator handoff | Existing `lead_source=packaging_calculator` plus current `submission_page`; calculator summary remains attached |
| Chinese quote form | Existing `lead_source=chinese_quote_page` plus current `submission_page` |
| Studio | Existing `lead_source=gift_box_solution_builder` and project/specification fields |
| Chatbot | Existing `leadSource=Website Chatbot`, `pageUrl`, `pageTitle`, `submissionTime` |

The standard form now fills a missing source at submission time and preserves any existing calculator/Chinese source. `submission_page` contains only the pathname, with no query or fragment. These fields identify the form route. They do not establish first-touch marketing attribution, a search keyword or a GA session match. Historical submissions are not backfilled.

GA configuration strips query strings and fragments from its configured page location and referrer; ordinary enquiry forms do not persist UTM attribution. Do not invent source/medium attribution from a form-route label. Names, emails, project text, dimensions and artwork URLs are not copied into custom analytics events. Optional analytics must never block a legitimate enquiry.

## Reusable checks

1. Verify the production revision and the actual property/stream identity. Record the property's reporting timezone and explicit date range. A rolling dashboard card may include an unfinished property day.
2. Read recent events and key-event configuration. Match the names above to actual receipt; missing recent events may mean no activity, no consent or a defect and need investigation.
3. Read the matching Formspree form and notification destination. Separate inbox entries, spam, test records, notification configuration and actual delivery. Respect the dashboard's archive limits.
4. Run `node scripts/check-quote-retry.mjs`, `node scripts/check-analytics-consent.mjs` and the existing `npm run audit:enquiry` against a local build. The browser check intercepts Formspree and blocks other external requests; it verifies trigger behavior and payloads without sending an enquiry or polluting GA reports.
5. For a dedicated live receipt investigation, Google recommends device-scoped DebugView/Tag Assistant testing and explains that lack of analytics consent prevents debug event visibility.[2] A local queue or intercepted request is not proof of GA receipt. Do not enable debug collection for every visitor.
6. Validate relevant source/release checks before deployment; verify the live revision and affected routes afterward. Keep customer details, tokens and dashboard exports outside the repository.

## Current limitations

- Standard-form, studio and chatbot acceptance events have different names; report their denominators and date ranges explicitly.
- Backend acceptance does not prove that the notification reached an inbox or that MTT replied. Manually qualify commercial enquiries and deduplicate them separately.
- Historical analytics does not reconstruct unconsented traffic or missing source fields. The 30-day plan must exclude pre-plan enquiries from its new-results totals.
- `rfq_submitted`, `whatsapp_clicked`, `email_clicked`, `cta_clicked` and `file_uploaded` in the old August plan are not the current implemented custom event names.

## Sources

[1] https://developers.google.com/analytics/devguides/collection/ga4/reference/events
[2] https://support.google.com/analytics/answer/7201382?hl=en
