import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';

import { I18nextProvider } from "react-i18next";

let loadPath = '/locales/{{lng}}/{{ns}}.json';

i18n
    .use(Backend)
    .use(I18nextProvider)
    .init({
        fallbackLng: 'de',
        ns: [
            'inline',
            'buttons',
            'messages',
            'options'
        ],
        defaultNs: 'inline',
        debug: true,
        react: {
            wait: true, // wait for xhr request
            bindI18n: "languageChanged loaded",
            bindStore: 'added removed',
            nsMode: 'default'
        },
        backend: {
            loadPath: loadPath,
            crossDomain: true
        }
    });

/*
const iData = JSON.parse(sharedData);

let url = new URL(window.location.href);
let c = url.searchParams.get("lng");
let lang = 'de';

if (typeof c !== 'undefined' && c !== null)
  lang = c;
else if (typeof iData.language !== 'undefined' && iData.language !== null)
  lang = iData.language;

i18n.changeLanguage(lang);

*/

export default i18n;