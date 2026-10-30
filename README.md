# أوبسيديان سينما · Obsidian Cinema
ثيم سلة Twilight مبني على أساس **رائد (Raed, MIT)** لمتاجر التقنية: جرافيت داكن، عناوين تيتانيوم وشامبين معدنية، هيدر زجاجي، بطاقات بحواف هولوغرام، حبيبات فيلم، حلقات ثقة ومؤشرات مخزون بدل النجوم.
A Salla Twilight theme built on **Raed**: cinematic graphite, metallic titanium/champagne headings, glass header, hologram cards, film grain, trust rings and stock meters instead of stars.

## الميزات · Features
- أقسام: `oc-hero` (مؤشرات)، `oc-categories` (ربط حي بتصنيفات المتجر)، `oc-products`، `oc-vertical` (منتجات الفئة فقط)، `oc-trust`.
- 11 نمط فئة: electronics, phones, watches, computers, gaming, audio, digital_cards, smarthome, cameras, accessories, software — من الإعداد `oc_vertical` أو كشف تلقائي.
- وضع المعاينة (أبيض) يظهر فقط على salla.design/demo/preview أو `?oc_preview=1`؛ لا يظهر للعملاء.
- السلة والدفع وخيارات المنتج تبقى عناصر سلة الأصلية. لا خطوط/سكربتات/CDN خارجية.

## التطوير · Development
```
pnpm install && pnpm run prod      # build to public/
salla theme preview                # Salla CLI preview on a demo store
```
Install: push to GitHub → Salla Partners → Themes → link repo → preview/publish.

## Placeholders
- `author_email` = fooz1980k@gmail.com, `repository` = github.com/playkhaled20/hangul-theme
- Screenshots: add to `/screenshots/` (desktop 1440×900, mobile) — mockups in `/preview/`.
