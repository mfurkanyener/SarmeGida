'use client';

import {useEffect} from 'react';
import {useLanguageSwitch} from '@/app/components/i18n/LanguageSwitchContext';

export default function SetLangOverride({ trPath, enPath }: { trPath?: string; enPath?: string }) {
    const { setOverride } = useLanguageSwitch();

    useEffect(() => {
        // sayfa mount → override yaz
        setOverride({
            tr: trPath,
            en: enPath,
        });
        // unmount → override temizle
        return () => setOverride(null);
    }, [trPath, enPath, setOverride]);

    return null;
}