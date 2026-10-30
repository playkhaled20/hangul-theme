# جرّبها على يدك — Try it on

- **المعرّف:** `tryon`
- **المجموعة:** مساعدة الاختيار
- **النوع:** أداة عائمة
- **وش يسوي:** @d على يدك بالكاميرا أو صورة
- **الذكاء:** يقص المنتج من خلفيته (segmentation) ويركبه على صورة/كاميرا العميل

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/f/tryon.js`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (1 إعداد، 0 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)
- `cutout`

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('tryon')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
