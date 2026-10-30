# مساعدك الذكي — Your smart assistant

- **المعرّف:** `stylist`
- **المجموعة:** أساسيات
- **النوع:** أداة عائمة
- **وش يسوي:** اسأل عن أي منتج أو لون أو ميزانية أو صوّر لون تبيه ويرشح لك من منتجات المتجر
- **الذكاء:** يفهم سؤال العميل (منتج/لون/ميزانية) ويحلل لون صورة يرفعها ويرشح منتجات

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/f/stylist.js`
- `files/src/assets/styles/07-features/_stylist.scss`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (8 إعداد، 0 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('stylist')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
