# Rayeq «رايق» — Salla theme for tech stores

Private, standalone theme for **digital cards, electronics, phones, computers, electronic games, audio, accessories, smart home, cameras, software**.
Base: Salla *Raed* (MIT, see LICENSE). Tech features: radical tech-only rewrites, originally inspired by the «اضافاتنا» library (github.com/playkhaled20/idhafatina) — this repo is an **independent copy**; editing here never changes the library or any other theme.

## Store types (`tech_type` setting, or auto-detect)
`digital_cards · electronics · phones · computers · gaming · audio · accessories · smarthome · cameras · software` (auto: `presets.js` scores menu+product names; preview with `?store_type=gaming`).

## Tech features — `src/assets/js/tech/<id>.js` (each standalone, edit freely)
| id | what it does (tech) |
|---|---|
| stylist | Tech advisor chat: understands category, brand, budget, GB/RAM, use (gaming/photo/study) → ranks products |
| voice | Voice search tuned for device names (ايفون، بلايستيشن، 256 جيجا) |
| listen | Reads key SPECS aloud (storage, RAM, screen, battery, warranty, card region) |
| giftfinder | Tech gift by recipient (gamer/student/pro/kid/parent) + budget, digital-card fallback |
| quiz | "Which device fits you?" 4-step usage quiz |
| photocoach | Seller device-photo check: blur, exposure, screen glare, white background, centring |
| recolour | Preview device in official finishes (Titanium/Midnight…), keeps screen glass |
| tryon | "On your desk": cut-out device over camera/photo at relative size |
| setupmatch | Photo of your setup → colour theme → matching accessories (replaces undertone) |
| bundle | Compatible accessories on product page (platform-aware) (replaces look) |
| pixelart | 8-bit pixel art from game/device image (replaces colorbook) |
| presets | Tech store-type detection |

Shared: `kit.js` (tech vocab, products, UI sheet/fab), `imaging.js` (canvas, cutout, colour). Styles: `src/assets/styles/tech/tech.scss`.

## Per-store composition
`src/assets/js/tech/stores.js` → `DEFAULTS[type]` = features ON for that type. Merchant can switch any off with `tech_f_<id>` settings.
Add a feature to a store: add its id to the type list. New feature: create `tech/<id>.js` exporting `default` open(), register it in `index.js` (F for global button, PDP for product page), add `tech_f_<id>` in twilight.json and the master.twig list.

## Build
`pnpm install && pnpm run prod` → `public/tech.js`, `public/tech.css`.

## Design — Luxury tech
Dark graphite canvas, glass (blurred) header, titanium/champagne metallic headings, glowing product cards that follow the merchant's **primary colour** (`--color-primary`), champagne prices, gradient primary buttons. Toggle: `tech_lux` setting (on by default). Respects `prefers-reduced-motion`. File: `src/assets/styles/tech/_lux.scss`.

## Salla policy compliance
- Built on official **Raed** (Twilight, MIT) — Salla web components (`salla-*`), cart/checkout/payment flows untouched.
- No external scripts, fonts or CDNs; no tracking; all processing (voice, images) runs in the browser via standard Web APIs with user action (camera/mic only on tap).
- Merchant-controlled via twilight settings (store type, every feature on/off, luxury skin); fonts/colours stay on Salla's own settings.
- RTL/Arabic first + English; accessible dialogs (role=dialog, Esc to close, aria-labels).
- Before publishing: set `author_email` in twilight.json, add screenshots, and pass Twilight CI.
