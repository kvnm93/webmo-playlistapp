export function detectLanguage(i18n) {
  let lang = 'de';
  if (typeof i18n.language !== 'undefined' && i18n.language.includes('en', 'de')) {
    lang = i18n.language;
  } else {
    lang = i18n.options.fallbackLng[0];
  }
  return lang;
}

export function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}