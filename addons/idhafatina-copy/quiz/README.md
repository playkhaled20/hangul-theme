# اكتشف ذوقك — Discover your taste

- **المعرّف:** `quiz`
- **المجموعة:** مساعدة الاختيار
- **النوع:** قسم بالصفحة
- **وش يسوي:** أسئلة بالصور تطلع ذوقك
- **الذكاء:** يستنتج ذوق العميل من اختياراته بالصور ويرشح

## الملفات (نسخة مستقلة قابلة للتعديل)
- `files/src/assets/js/idhafatina/f/quiz.js`
- `files/src/views/components/home/idhafatina-quiz.twig`
- `i18n.json`: نصوص عربي/إنجليزي لهذي الإضافة فقط
- `twilight-snippet.json`: إعدادات/مكوّن twilight الخاصة فيها (0 إعداد، 1 مكوّن)

## يعتمد على
- `kit.js` + `i18n.js` (في `_shared/`)

## طريقة إعادة الاستخدام في ثيم جديد
1. انسخ `files/` لنفس المسارات في الثيم الجديد.
2. ادمج `i18n.json` في `public/i18n/{ar,en}.js` (js) و `src/locales/{ar,en}.json` تحت `idhafatina` (twig).
3. أضف `twilight-snippet.json` لـ `twilight.json`.
4. فعّلها في `f/loader.js` (`on('quiz')`) أو ضمّن قالب القسم في `pages/index.twig`.

> نسخة مستقلة — التعديل هنا ما يأثر على أي ثيم منشور.
