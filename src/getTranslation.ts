import translations from './translationFile.ts';

function getTranslation(lang:string, key:string) {
    // @ts-ignore
    if (translations[lang] && translations[lang][key]) {
        // @ts-ignore
        return translations[lang][key];
    }

    // fallback to english translation if requested language is not available
    // @ts-ignore
    if (translations.en[key]) {
        // @ts-ignore
        return translations.en[key];
    }

    return key;
}

export default getTranslation;
