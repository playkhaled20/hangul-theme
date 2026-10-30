export const TYPES = ["general", "men", "abaya", "kids", "shoesbags", "jewelry", "gifts", "perfume", "furniture", "textiles"];
export const LEGACY = {"fashion": "abaya", "home": "furniture", "food": "general"};
export const TYPE_WORDS = {
  men: /(ثوب|ثياب|اثواب|شماغ|غتر|غتره|بشت|رجالي|عقال|thobe|menswear|ghutra|shemagh)/,
  abaya: /(عبايه|عبايات|جلابيه|فستان|فساتين|طرحه|طرح|نسائي|ازياء|abaya|dress|women|kaftan)/,
  kids: /(اطفال|مواليد|بيبي|رضع|حفاضات|kids|baby|newborn|infant)/,
  shoesbags: /(حذاء|احذيه|جزم|شنط|شنطه|حقيبه|حقائب|كلتش|صندل|shoes|bags?|sneakers|clutch|handbag)/,
  jewelry: /(مجوهرات|ذهب|فضه|خاتم|خواتم|اساور|عقد|قلاده|حلق|ساعه|ساعات|jewel|gold|silver|ring|necklace|bracelet|watch)/,
  gifts: /(هدايا|هديه|اكسسوار|اكسسوارات|تغليف|توزيعات|gift|accessor|present)/,
  perfume: /(عطر|عطور|عود|بخور|دهن|مسك|معمول|مبخره|perfume|oud|incense|fragrance|musk|bakhoor)/,
  furniture: /(اثاث|ديكور|كنب|طاوله|كرسي|سجاد|اضاءه|furniture|decor|sofa|table|chair|rug|lamp)/,
  textiles: /(مفارش|مفرش|لحاف|مخدات|بطانيات|مناشف|ستائر|bedding|linen|duvet|pillow|towel|curtain)/,
};

const W = ['men', 'abaya', 'kids', 'shoesbags', 'fashion'];
const mk = (variant, types) => Object.fromEntries(types.map(t => [t, variant]));
export const FAMS = {
  wardrobe: { ...mk('fashion', W), shoesbags: 'sb', ...mk('jewelry', ['jewelry', 'gifts']) },
  undertone: { ...mk('fashion', ['abaya', 'fashion']), jewelry: 'jewelry' },
  packlist: mk('fashion', ['abaya', 'shoesbags', 'fashion', 'jewelry']),
  repeat: { ...mk('fashion', ['men', 'abaya', 'kids', 'fashion', 'jewelry']), ...mk('gift', ['gifts', 'perfume']) },
  metal: { jewelry: 'jewelry' },
  look: { ...mk('fashion', ['men', 'abaya', 'kids', 'fashion', 'jewelry']), ...mk('hm', ['furniture', 'textiles']), ...mk('gf', ['gifts']) },
  quiz: mk('fashion', [...W, 'jewelry']),
  atelier: { jewelry: 'jewelry' }
};
