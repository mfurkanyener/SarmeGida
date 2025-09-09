'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => setVisible(window.scrollY > 200);
        window.addEventListener('scroll', toggle, { passive: true });
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="
        fixed bottom-24 right-5 z-50
        p-4 md:p-5
        rounded-full
        bg-[color:var(--olive-700)] text-white
        shadow-lg hover:bg-[color:var(--olive-600)]
        transition
      "
            aria-label="Yukarı çık"
        >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </button>
    );
}