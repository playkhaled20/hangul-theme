# صوّر منتجك صح — Photograph your product right

- **المعرّف:** `photocoach`
- **المجموعة:** بعد الشراء
- **النوع:** قسم بالصفحة
- **وش يسوي:** نصايح لصورة @i أحلى
- **الذكاء:** يحلل صورة العميل (إضاءة/خلفية/وضوح) ويعطي نصايح

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/f/photocoach.js`
- `files/src/assets/styles/07-features/_photocoach.scss`
- `files/src/views/components/home/idhafatina-photocoach.twig`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (0 إعداد، 1 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)
- `cutout`

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('photocoach')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
