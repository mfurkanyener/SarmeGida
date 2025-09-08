'use client';

import {createContext, useContext, useState, ReactNode} from 'react';

type OverrideMap = { tr?: string; en?: string } | null;

type Ctx = {
    override: OverrideMap;
    setOverride: (v: OverrideMap) => void;
};

const LanguageSwitchCtx = createContext<Ctx | null>(null);

export function LanguageSwitchProvider({children}: {children: ReactNode}) {
    const [override, setOverride] = useState<OverrideMap>(null);
    return (
        <LanguageSwitchCtx.Provider value={{override, setOverride}}>
            {children}
        </LanguageSwitchCtx.Provider>
    );
}

export function useLanguageSwitch() {
    const ctx = useContext(LanguageSwitchCtx);
    if (!ctx) throw new Error('useLanguageSwitch must be used inside LanguageSwitchProvider');
    return ctx;
}