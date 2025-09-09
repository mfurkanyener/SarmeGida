import {getRequestConfig, type GetRequestConfigParams} from 'next-intl/server';

// TR
import trCommon from '../messages/tr/trCommon.json';
import trHomepage from '../messages/tr/trHomepage.json';
import trAbout from '../messages/tr/trAbout.json';
import trProduct from '../messages/tr/trProduct.json';
import trBlog from '../messages/tr/trBlog.json';
import trContact from '../messages/tr/trContact.json';
import trPrivacy from '../messages/tr/trPrivacy.json';
import trTermsConditions from '../messages/tr/trTermsConditions.json';
import trFaq from '../messages/tr/trFaq.json';



// EN
import enCommon from '../messages/en/enCommon.json';
import enHomepage from '../messages/en/enHomepage.json';
import enAbout from '../messages/en/enAbout.json';
import enProduct from '../messages/en/enProduct.json';
import enBlog from '../messages/en/enBlog.json';
import enContact from '../messages/en/enContact.json';
import enPrivacy from '../messages/en/enPrivacy.json';
import enTermsConditions from '../messages/en/enTermsConditions.json';
import enFaq from '../messages/en/enFaq.json'



const SUPPORTED = ['tr', 'en'] as const;
const FALLBACK = 'tr' as const;

export default getRequestConfig(async ({locale}: GetRequestConfigParams) => {
    const safe =
        (SUPPORTED as readonly string[]).includes(locale ?? '')
            ? (locale as (typeof SUPPORTED)[number])
            : FALLBACK;

    const messages =
        safe === 'tr'
            ? { ...trCommon, ...trHomepage, ...trAbout, ...trProduct, ...trBlog, ...trContact, ...trPrivacy, ...trTermsConditions, ...trFaq }
            : { ...enCommon, ...enHomepage, ...enAbout, ...enProduct, ...enBlog, ...enContact, ...enPrivacy, ...enTermsConditions, ...enFaq};

    return { locale: safe, messages };
});