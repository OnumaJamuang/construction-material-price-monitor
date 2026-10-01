# Price collector

The collector architecture is intentionally source-specific.

1. A URL is matched to a source adapter.
2. The adapter fetches only a permitted public product page at low frequency.
3. Structured Product JSON-LD is preferred; HTML text is a fallback.
4. Normalized data is written to listings.
5. Every successful check appends a price_history row.
6. Access errors are recorded rather than bypassing anti-bot controls.

## DoHome
The current adapter extracts product name, SKU, current price, regular price when present, unit, image, brand and stock status. It supports both /product/... and legacy product URLs whose SKU is embedded in the URL.

## Next
The runner needs server-side Supabase credentials supplied only as deployment/GitHub secrets. Never commit a secret/service-role key to this repository.
