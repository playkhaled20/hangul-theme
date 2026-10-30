export const SIZE_TYPES = ['men', 'abaya', 'kids', 'shoesbags', 'textiles', 'jewelry', 'gifts', 'furniture'];
const SUF = { '': 'حجم', 'ه': 'حجمه', 'ها': 'حجمها', 'ات': 'أبعاد', 'اته': 'أبعاده', 'اتها': 'أبعادها' };
export const unsize = (s, t) => (!s || SIZE_TYPES.includes(t) || s.indexOf('مقاس') < 0 ? s
  : s.replace(/(^|[^\u0621-\u064A])(بال|وال|لل|ال|ب|و|ل)?مقاس(اتها|اته|ات|ها|ه)?(?![\u0621-\u064A])/g, (m, a, p, x) => a + (p || '') + SUF[x || '']));
