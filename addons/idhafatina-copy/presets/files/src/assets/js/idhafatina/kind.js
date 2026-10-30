// drawing kind + palette per store type; shapes come from components/idhafatina-ks.twig
const T = 'men:t abaya:a fashion:a kids:k shoesbags:g jewelry:j perfume:p furniture:s textiles:s';
export const KIND = Object.fromEntries(T.split(' ').map(x => x.split(':')));
// atelier wording family per type (jewel/bag/box types keep jw or gen)
export const KAT = Object.fromEntries(Object.entries(KIND).filter(e => 'takpbdschwfv'.includes(e[1])).map(([t, k]) => [t, 'k' + k]));
export const kindOf = t => KIND[t] || 'x';
export const CLOTH = 'tak';
// colours (names: look.cn) and up to 8 per kind, as base-36 indexes
export const HEX = '24201E F5F1EA D9C3A5 22304F E7B6BE 4E6B55 6E2433 9B9893 6B4A33 EFE6D2 A9C8E0 C9A45C C4C7CC 7A5AAF B3283A 3D6A9C A47148 3F918C'.split(' ').map(h => '#' + h);
const P = { t: '1927380', a: '01238756', k: '1a45ef23', g: '0182641b', j: 'bc14056e', p: 'b94d0e85', b: '14a95hd2', d: '01c73fb5', s: '7291g538', c: '108g2536', h: '107c3h5e', w: '128e5b0g', f: 'e41d9b6f', v: '3017fbh5', x: 'eb53012d' };
export const palOf = k => [...(P[k] || P.x)].map(i => parseInt(i, 36));
export const shapeOf = k => { const e = document.querySelector(`.idhafatina-ks [data-k=${{ p: 'b', h: 'c' }[k] || k}]`) || document.querySelector('.idhafatina-ks [data-k=x]'); return e ? [e.dataset.m, e.dataset.d] : 0; };
