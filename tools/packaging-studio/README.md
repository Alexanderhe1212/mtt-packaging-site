# MTT Packaging Studio

Source for the public Design Your Box app. The selected October 9, 2026 design is concept 3: forest-green live preview, white size panel, four steps, specification-aware RFQ.

`npm run build:studio` builds and packages `public/tools/gift-box-solution-builder/app.html`. The normal website build invokes this automatically. `npm run check:studio` verifies sizing, migration, handoff and RFQ acceptance without sending real messages. `npm exec vite -- --config tools/packaging-studio/vite.config.ts` opens the source development server on port 4199.

## Source boundary

The existing public 3D geometry, artwork placement, project sanitization and packaging set modules were recovered from the local public tool source `mtt-tool-dimensions`. The previous public production app had its own Design Your Box title and compact summary; those are superseded by this approved flow, while saved `public-1` project files and the two existing storage keys remain supported. No internal pricing or costing modules are included. Build guard rejects them.

## Dimensions

Canonical project dimensions are millimetres. Product mode computes each internal axis as product + 2 × editable allowance. Box mode records the customer's finished internal dimensions; unknown product dimensions are not fabricated. Bag axes are width, gusset, height. Preview thickness and mating clearance are illustrative; neither the flat reference layout nor the preview is production approval.

Calculator handoff uses `mtt_studio_handoff_v1` session storage. It opens an explicit new-project choice and does not replace an existing project ID. Inputs are validated again before use. Invalid dimensions hide the old preview and block design/quote progression. The editor still preserves local artwork and imports previous editable JSON project files.

## Enquiries

Existing Formspree endpoint and Hugo WhatsApp number are preserved. The internal size, dimension order, basis and allowance are carried into both channels. Only an explicit provider `ok:true` marks acceptance; ambiguous failures remain unconfirmed. Local artwork is not automatically transmitted. User copy explains sharing a file/link separately. No customer PII is sent in analytics events; the iframe bridge only allows approved event names and checks origin plus source.
