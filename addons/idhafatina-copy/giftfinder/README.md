# دوّر لي هدية — Find me a gift

- **المعرّف:** `giftfinder`
- **المجموعة:** هدايا ومناسبات
- **النوع:** قسم بالصفحة
- **وش يسوي:** ثلاث ضغطات وتطلع لك هدايا حقيقية
- **الذكاء:** يرشح هدية حسب الشخص والمناسبة والميزانية

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/f/giftfinder.js`
- `files/src/views/components/home/idhafatina-giftfinder.twig`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (0 إعداد، 1 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('giftfinder')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
