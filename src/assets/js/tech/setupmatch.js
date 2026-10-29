// setupmatch (tech, replaces "undertone"): photograph your setup (desk/room/RGB) — extracts the dominant colours and suggests accessories that match its colour theme.
import { T, sheet, products, card, text, esc } from './kit';
import { fileImg, canvasOf, rgb2hsl } from './imaging';
const TONES = { black: /(اسود|black|midnight)/, white: /(ابيض|white|starlight)/, rgb: /(rgb|ار جي بي|اضاءه)/, blue: /(ازرق|blue)/, pink: /(وردي|pink)/, gray: /(رمادي|gray|grey|space)/, green: /(اخضر|green)/ };
export function palette(img) { const D = canvasOf(img, 160).getContext('2d').getImageData(0, 0, 160, 160).data, n = {};
  for (let o = 0; o < D.length; o += 16) { const [h, s, l] = rgb2hsl(D[o], D[o + 1], D[o + 2]);
    const k = l < .18 ? 'black' : l > .85 ? 'white' : s < .15 ? 'gray' : s > .6 && l > .4 ? 'rgb' : h < 20 || h > 330 ? 'pink' : h < 170 ? 'green' : 'blue'; n[k] = (n[k] || 0) + 1; }
  return Object.entries(n).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]); }
export default function open() { const w = sheet(T({ ar: 'طابق ستايل جهازك', en: 'Match your setup' }), `<p>${T({ ar: 'صوّر مكتبك أو غرفة القيمنق ونرشح إكسسوارات بنفس الطابع.', en: 'Snap your desk or gaming room; we suggest matching accessories.' })}</p><input type="file" accept="image/*"><p class="tk-tone"></p><div class="tk-grid"></div>`);
  w.querySelector('input').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; const tones = palette(await fileImg(f));
    w.querySelector('.tk-tone').textContent = T({ ar: 'طابعك: ', en: 'Your theme: ' }) + tones.join(' + ');
    const r = (await products()).filter(p => tones.some(t => TONES[t].test(text(p)))).slice(0, 6); w.querySelector('.tk-grid').innerHTML = r.map(p => card(p)).join('') || esc(T({ ar: 'ما لقينا تطابق لوني.', en: 'No colour match.' })); }); }
