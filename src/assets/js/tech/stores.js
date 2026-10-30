// Per tech store type → which features are ON by default (merchant can override in theme settings).
export const DEFAULTS = {
  digital_cards: ['stylist', 'voice', 'giftfinder', 'listen'],
  electronics:   ['stylist', 'voice', 'quiz', 'giftfinder', 'listen', 'recolour', 'tryon', 'bundle', 'setupmatch'],
  phones:        ['stylist', 'voice', 'quiz', 'listen', 'recolour', 'bundle'],
  computers:     ['stylist', 'voice', 'quiz', 'listen', 'tryon', 'bundle'],
  gaming:        ['stylist', 'voice', 'giftfinder', 'setupmatch', 'bundle', 'pixelart'],
  audio:         ['stylist', 'voice', 'listen', 'recolour', 'bundle'],
  accessories:   ['stylist', 'voice', 'bundle', 'setupmatch', 'recolour'],
  smarthome:     ['stylist', 'voice', 'listen', 'tryon', 'bundle'],
  cameras:       ['stylist', 'voice', 'listen', 'bundle', 'photocoach'],
  software:      ['stylist', 'voice', 'giftfinder', 'listen']
};
