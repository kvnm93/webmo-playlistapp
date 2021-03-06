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

export function secondsToMinutes (sec) {
    let sec_num = parseInt(sec, 10); // don't forget the second param
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}