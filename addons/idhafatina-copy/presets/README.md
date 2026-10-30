# الأنواع العشرة + الكشف التلقائي — 10 store types + detection

- **المعرّف:** `presets`
- **المجموعة:** أنظمة أساسية
- **النوع:** نظام
- **وش يسوي:** الأنواع العشرة + الكشف التلقائي
- **الذكاء:** يقرأ أسماء المنتجات والقوائم ويحدد نوع المتجر من 10 أنواع ويضبط الأقسام والصور

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/presets.js`
- `files/src/assets/js/idhafatina/detect.js`
- `files/src/assets/js/idhafatina/preset-swap.js`
- `files/src/assets/js/idhafatina/preset-icons.js`
- `files/src/assets/js/idhafatina/bodymap.js`
- `files/src/assets/js/idhafatina/kind.js`
- `files/src/assets/js/idhafatina/sizeword.js`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (0 إعداد، 0 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)
- `presets`
- `bodymap`
- `detect`
- `kind`
- `i18n`

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('presets')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
