// app/i18n.ts (ya da nerede ise)
import {getRequestConfig, type GetRequestConfigParams} from 'next-intl/server';

// TR
import trCommon from '../messages/tr/trCommon.json';
import trHomepage from '../messages/tr/trHomepage.json';
import trAbout from '../messages/tr/trAbout.json';
import trProducts from '../messages/tr/trProduct.json';
import trBlog from '../messages/tr/trBlog.json';
import trContact from '../messages/tr/trContact.json';

// EN
import enCommon from '../messages/en/enCommon.json';
import enHomepage from '../messages/en/enHomepage.json';
import enAbout from '../messages/en/enAbout.json';
import enProduct from '../messages/en/enProduct.json';
import trProduct from '../messages/tr/trProduct.json';
import enBlog from '../messages/en/enBlog.json';
import enContact from '../messages/en/enContact.json';

const SUPPORTED = ['tr', 'en'] as const;
const FALLBACK = 'tr' as const;

export default getRequestConfig(async ({locale}: GetRequestConfigParams) => {
    const safe =
        (SUPPORTED as readonly string[]).includes(locale ?? '')
            ? (locale as (typeof SUPPORTED)[number])
            : FALLBACK;

    const messages =
        safe === 'tr'
            ? { ...trCommon, ...trHomepage, ...trAbout, ...trProduct, ...trBlog, ...trContact }
            : { ...enCommon, ...enHomepage, ...enAbout, ...enProduct, ...enBlog, ...enContact };

    return { locale: safe, messages };
});