import type { AddonId } from './panel';

/**
 * The smart panel's wording for this theme (tech). Blisk has its own copy.ts with
 * the beauty wording; the panel code is the same in both themes.
 */
export function panelCopy(ar: boolean, _g?: (f: string, m: string) => string, _W?: [string, string, string]) {
  const t = (a: string, e: string) => (ar ? a : e);
  const names: Record<AddonId, string> = {
    stylist: t('مستشار الإعداد', 'Setup advisor'),
    voice: t('البحث الصوتي', 'Voice search'),
    listen: t('استمع للمواصفات', 'Listen to specs'),
    tryon: t('الحجم الحقيقي', 'True size'),
    recolour: t('معاينة التشطيبات', 'Finish preview'),
    photocoach: t('مدرب التوثيق والتصوير', 'Photo & proof coach'),
    colorbook: t('دليل التشطيبات', 'Finish lookbook'),
    look: t('أكمل الطقم', 'Complete the kit'),
    quiz: t('اختبار احتياجك', 'Needs quiz'),
    undertone: t('فاحص التوافق', 'Compatibility check'),
    giftfinder: t('مكتشف الهدايا', 'Gift finder'),
    presets: t('باقات جاهزة', 'Ready bundles'),
  };
  return {
    names,
    idle: t('اختر أداة — المحتوى مخصص لقسم', 'Pick a tool — tailored to'),
    recolour: t('اختر التشطيب', 'Pick a finish'),
    colorbook: t('دليل التشطيبات المتوفرة', 'Finish lookbook'),
    photocoach: t('وثّق جهازك صح', 'Document your device right'),
    look: t('أكمل طقمك', 'Complete your kit'),
    presets: t('باقات جاهزة', 'Ready bundles'),
    undertone: t('جهازك/نظامك؟', 'Your platform?'),
    speak: t('تكلم الحين…', 'Speak now…'),
    unheard: t('ما قدرنا نسمعك — جرّب الكتابة', 'Could not hear you — try typing'),
    ask: t('اسأل عن أي جهاز أو ميزانية أو سياسة', 'Ask about a device, budget or policy'),
    askHint: t('مثال: جوال كاميرا ممتازة', 'e.g. phone with great camera'),
    askLabel: t('اسأل المساعد', 'Ask the assistant'),
    ruler: (w: number, h: number) => t(`مقاس مرجعي ≈ ${w}×${h} ملم. قارنه بجهازك الحالي — تقريبي ويختلف حسب الشاشة.`, `Reference ≈ ${w}×${h} mm. Compare with your current device — approximate, varies by screen.`),
    listenTitle: t('المواصفات', 'Specs'),
    faq: [
      [
        t('الضمان والاستبدال', 'Warranty & returns'),
        t(
          'الضمان والاستبدال والاسترجاع حسب سياسة المتجر المكتوبة في صفحات المتجر أسفل الموقع. احتفظ بالفاتورة وصور الجهاز عند الاستلام.',
          'Warranty, exchange and returns follow the store policy pages in the footer. Keep your invoice and photos of the device on receipt.'
        ),
      ],
      [t('الشحن والتوصيل', 'Shipping'), t('مدة وتكلفة التوصيل تظهر في السلة حسب مدينتك قبل الدفع، وتتابع طلبك من «طلباتي».', 'Delivery time and cost appear in your cart for your city before payment; track the order from “My orders”.')],
      [t('الدفع', 'Payment'), t('طرق الدفع المتاحة تظهر عند إتمام الطلب، وكل المدفوعات تمر عبر بوابة سلة الآمنة.', 'Available payment methods show at checkout; all payments go through Salla’s secure gateway.')],
    ] as [string, string][],
  };
}
