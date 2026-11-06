/**
 * Hangul data carried over from the Twig theme: the store verticals
 * (src/assets/js/obsidian/verticals.js) and the background palettes
 * (src/assets/styles/obsidian/_v12.scss).
 */
/** The general vertical: used when no specific one matches. */
export const GENERAL_VERTICAL = 'electronics';

export const VERTICAL_IDS = ["electronics", "phones", "watches", "computers", "gaming", "audio", "digital_cards", "smarthome", "cameras", "accessories", "software"] as const;
export type VerticalId = (typeof VERTICAL_IDS)[number];

export interface Vertical {
  ar: string;
  en: string;
  /** Metallic accent for this vertical (used when the accent is «champagne»). */
  acc: string;
  /** Words that point to this vertical in the store's name and description. */
  kw: string[];
  /** Arabic hero line. */
  hero: string;
}

export const VERTICALS: Record<VerticalId, Vertical> = {
  "electronics": {
    "ar": "الإلكترونيات",
    "en": "Electronics",
    "acc": "#d9b779",
    "kw": [
      "تلفزيون",
      "شاشه",
      "شاشات",
      "tv",
      "oled",
      "qled",
      "الكترونيات",
      "electronic",
      "جهاز عرض",
      "بروجكتر",
      "projector"
    ],
    "hero": "تقنية سينمائية بمعايير لا تُضاهى"
  },
  "phones": {
    "ar": "الجوالات",
    "en": "Phones",
    "acc": "#c9ccd1",
    "kw": [
      "iphone",
      "ايفون",
      "جوال",
      "جوالات",
      "هاتف",
      "هواتف",
      "galaxy",
      "جالكسي",
      "جالاكسي",
      "phone",
      "pixel",
      "بكسل",
      "سامسونج",
      "شاومي",
      "هواوي",
      "redmi"
    ],
    "hero": "أحدث الجوالات بضمان الوكيل"
  },
  "watches": {
    "ar": "الساعات الذكية",
    "en": "Smart watches",
    "acc": "#e0a98f",
    "kw": [
      "ساعه",
      "ساعات",
      "watch",
      "سوار ذكي",
      "باند",
      "smartwatch",
      "band"
    ],
    "hero": "الوقت، بذكاء فاخر"
  },
  "computers": {
    "ar": "الكمبيوتر",
    "en": "Computers",
    "acc": "#9fd4ff",
    "kw": [
      "لابتوب",
      "laptop",
      "macbook",
      "ماك بوك",
      "كمبيوتر",
      "حاسب",
      "pc",
      "معالج",
      "ssd",
      "ram",
      "رام",
      "شاشه العاب",
      "كرت شاشه",
      "gpu",
      "ipad",
      "ايباد",
      "تابلت",
      "tablet"
    ],
    "hero": "أداء احترافي لكل مهمة"
  },
  "gaming": {
    "ar": "الألعاب",
    "en": "Gaming",
    "acc": "#8cff7a",
    "kw": [
      "playstation",
      "بلايستيشن",
      "بلاي ستيشن",
      "ps5",
      "xbox",
      "اكس بوكس",
      "nintendo",
      "نينتندو",
      "العاب",
      "gaming",
      "قيمنق",
      "جيمنج",
      "يد تحكم",
      "controller",
      "dualsense"
    ],
    "hero": "ادخل اللعبة بمستوى آخر"
  },
  "audio": {
    "ar": "الصوتيات",
    "en": "Audio",
    "acc": "#d9b779",
    "kw": [
      "سماعه",
      "سماعات",
      "headphone",
      "earbuds",
      "airpods",
      "ايربودز",
      "speaker",
      "مكبر",
      "سبيكر",
      "ساوند بار",
      "soundbar",
      "صوتيات"
    ],
    "hero": "صوت مرجعي بلا تنازلات"
  },
  "digital_cards": {
    "ar": "البطاقات الرقمية",
    "en": "Digital cards",
    "acc": "#b48cff",
    "kw": [
      "بطاقه",
      "بطاقات",
      "card",
      "gift card",
      "itunes",
      "ايتونز",
      "steam",
      "ستيم",
      "psn",
      "شحن رصيد",
      "رصيد",
      "اشتراك",
      "اشتراكات",
      "code",
      "كود"
    ],
    "hero": "بطاقاتك الرقمية، فوراً"
  },
  "smarthome": {
    "ar": "المنزل الذكي",
    "en": "Smart home",
    "acc": "#7ae0d0",
    "kw": [
      "منزل ذكي",
      "المنزل الذكي",
      "smart home",
      "مراقبه",
      "alexa",
      "اليكسا",
      "اضاءه ذكيه",
      "plug",
      "قفل ذكي",
      "جرس",
      "حساس",
      "tapo",
      "aqara"
    ],
    "hero": "منزلك يفكّر معك"
  },
  "cameras": {
    "ar": "الكاميرات",
    "en": "Cameras",
    "acc": "#d9b779",
    "kw": [
      "كاميرا",
      "كاميرات",
      "camera",
      "canon",
      "كانون",
      "sony alpha",
      "nikon",
      "نيكون",
      "عدسه",
      "lens",
      "gopro",
      "جو برو",
      "dji",
      "درون",
      "drone",
      "جيمبال"
    ],
    "hero": "احترافية سينمائية في يدك"
  },
  "accessories": {
    "ar": "الإكسسوارات",
    "en": "Accessories",
    "acc": "#c9ccd1",
    "kw": [
      "شاحن",
      "شواحن",
      "كفر",
      "كفرات",
      "cable",
      "كيبل",
      "charger",
      "case",
      "حمايه",
      "باور بانك",
      "power bank",
      "ملحقات",
      "اكسسوارات",
      "حامل"
    ],
    "hero": "كل ما يكمّل أجهزتك"
  },
  "software": {
    "ar": "البرمجيات",
    "en": "Software",
    "acc": "#9fd4ff",
    "kw": [
      "windows",
      "ويندوز",
      "office",
      "اوفيس",
      "ترخيص",
      "تراخيص",
      "license",
      "antivirus",
      "برنامج",
      "برامج",
      "vpn",
      "adobe",
      "ادوبي"
    ],
    "hero": "تراخيص أصلية فورية"
  }
};

/** Background palettes: [page, surface, glow]. */
export const BACKGROUNDS: Record<string, [string, string, string]> = {
  "graphite": [
    "#0b0b0d",
    "#141417",
    "#25211a"
  ],
  "midnight": [
    "#070a14",
    "#0f1424",
    "#1a2240"
  ],
  "onyx": [
    "#000000",
    "#0c0c0c",
    "#1c1c1c"
  ],
  "titanium": [
    "#16181b",
    "#202328",
    "#3a3e45"
  ],
  "espresso": [
    "#120b07",
    "#1c130d",
    "#3a2617"
  ],
  "navy": [
    "#06101f",
    "#0d1a30",
    "#16325a"
  ],
  "emerald": [
    "#04110c",
    "#0a1d16",
    "#123b2c"
  ],
  "plum": [
    "#12081a",
    "#1d1028",
    "#3a1d4f"
  ],
  "wine": [
    "#16070b",
    "#240d13",
    "#4a1726"
  ],
  "ocean": [
    "#03141a",
    "#082430",
    "#0e4456"
  ],
  "ivory": [
    "#fbf8f1",
    "#ffffff",
    "#efe3c8"
  ],
  "sand": [
    "#f4ede1",
    "#fbf7ef",
    "#e3cfa8"
  ],
  "pearl": [
    "#f5f5f3",
    "#ffffff",
    "#e2e2de"
  ],
  "softblue": [
    "#eef3f9",
    "#ffffff",
    "#cfdcee"
  ],
  "mint": [
    "#eef6f1",
    "#ffffff",
    "#cfe6d8"
  ],
  "blush": [
    "#faf0ee",
    "#ffffff",
    "#efd2cb"
  ],
  "lavender": [
    "#f3f0f9",
    "#ffffff",
    "#ddd3ee"
  ],
  "cloud": [
    "#f2f4f6",
    "#ffffff",
    "#d9dee4"
  ]
};

export const LIGHT_BACKGROUNDS = ["ivory", "sand", "pearl", "softblue", "mint", "blush", "lavender", "cloud"];

export const ACCENTS: Record<string, string> = {
  titanium: '#c9ccd1',
  rose: '#e0a98f',
  ice: '#4d8dff',
};
