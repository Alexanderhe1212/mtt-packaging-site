# Google Analytics 4 (GA4) Integration Setup

> Status: ARCHITECTURE READY — Measurement ID required from owner
> Created: 2026-08-29

---

## Current State

GA4 is NOT currently installed. No analytics tracking is active.

## Required Owner Action

1. **Create a GA4 Property** at [analytics.google.com](https://analytics.google.com)
2. **Get the Measurement ID** (format: `G-XXXXXXXXXX`)
3. **Provide the ID** to the developer for integration

## Integration Architecture

MTT Packaging uses a static export build (vinext/Next.js). The GA4 integration will use the standard gtag.js snippet.

### Environment Variable

The Measurement ID should be stored as an environment variable:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note**: This project uses vinext (Vite-based Next.js). The environment variable prefix may need to be `VITE_GA_MEASUREMENT_ID` instead of `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Verify with the vinext documentation.

### Implementation Plan

When the Measurement ID is provided:

1. **Add gtag.js snippet to `app/layout.tsx`**:
   - Load the gtag.js library
   - Initialize with the Measurement ID
   - Only load in production (not in development)

2. **Track page views**:
   - Automatic with gtag.js (no additional code needed)

3. **Track RFQ submissions** (primary conversion):
   - Event: `rfq_submitted`
   - Parameters: packaging_type, quantity, country
   - Trigger on successful form submission

4. **Track secondary conversions**:
   - Event: `whatsapp_clicked`
   - Event: `email_clicked`
   - Event: `cta_clicked` (with CTA location parameter)

5. **Track file uploads**:
   - Event: `file_uploaded`
   - Parameters: file_type, file_size

### GA4 Events to Configure

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `page_view` | Automatic | page_location, page_title |
| `rfq_submitted` | RFQ form success | packaging_type, quantity, country |
| `whatsapp_clicked` | WhatsApp link click | source_page |
| `email_clicked` | Email link click | source_page |
| `cta_clicked` | CTA button click | cta_text, cta_location |
| `file_uploaded` | File upload | file_type |

### Conversion Events

Mark these as conversions in GA4:
- `rfq_submitted` (primary)
- `whatsapp_clicked` (secondary)

### Google Search Console

1. **Verify domain** in Google Search Console
2. **Link GA4** to Search Console
3. **Submit sitemap**: `https://mttpackaging.com/sitemap.xml`

### GA4 Configuration Checklist

- [ ] GA4 property created
- [ ] Measurement ID obtained (G-XXXXXXXXXX)
- [ ] gtag.js added to layout.tsx
- [ ] Page views tracking verified
- [ ] RFQ submission event configured
- [ ] WhatsApp click event configured
- [ ] Email click event configured
- [ ] Conversion events marked in GA4
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Real-time reports checked

---

## Privacy Considerations

- GA4 uses cookies for tracking
- Consider adding a cookie consent banner if targeting EU users (GDPR)
- The current site does NOT have a cookie consent mechanism
- TODO: Evaluate whether a cookie consent banner is needed based on target markets

---

## Technical Notes

- GA4 gtag.js adds ~45KB to page load
- Use `strategy="lazyOnload"` to avoid blocking initial render
- Consider using Partytown or similar to offload analytics to web worker (optional optimization)
- Static export means no server-side analytics middleware
