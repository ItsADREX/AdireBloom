# AdireBloom WordPress build

Custom WordPress + WooCommerce version of AdireBloom.

**Start here:** [WORDPRESS-DEPLOY.md](./WORDPRESS-DEPLOY.md)

## Quick commands

```bash
# Regenerate product import file from React product data
node wordpress/scripts/generate-products-csv.mjs

# Zip theme for WordPress.com upload
cd wordpress && zip -r adirebloom-theme.zip adirebloom-theme
```

## Theme location

`adirebloom-theme/` — upload as zip via **Appearance → Themes → Upload Theme** on WordPress.com Business+.
