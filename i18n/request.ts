import {getRequestConfig, type GetRequestConfigParams} from 'next-intl/server';

// TR
import trAbout from '../messages/tr/trAbout.json';
import trHomepage from '../messages/tr/trHomepage.json';
import trCommon from '../messages/tr/trCommon.json';
import trProducts from '../messages/tr/trProducts.json';
import trBlog from '../messages/tr/trBlog.json';

// EN
import enAbout from '../messages/en/enAbout.json';
import enHomepage from '../messages/en/enHomepage.json';
import enCommon from '../messages/en/enCommon.json';
import enProducts from '../messages/en/enProducts.json';
import enBlog from '../messages/en/enBlog.json';

const SUPPORTED = ['tr', 'en'] as const;
const FALLBACK = 'tr' as const;

export default getRequestConfig(async ({locale}: GetRequestConfigParams) => {
    const safe =
        (SUPPORTED as readonly string[]).includes(locale ?? '')
            ? (locale as (typeof SUPPORTED)[number])
            : FALLBACK;

    const messages =
        safe === 'tr'
            // sıra önemli: aynı kök varsa SONRAKİ olan ezer
            ? { ...trCommon, ...trHomepage, ...trAbout, ...trProducts, ...trBlog }
            : { ...enCommon, ...enHomepage, ...enAbout, ...enProducts, ...enBlog };

    return { locale: safe, messages };
});