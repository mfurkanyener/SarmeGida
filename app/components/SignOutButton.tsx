'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function SignOutButton() {
    const router = useRouter();

    async function signOut() {
        await supabaseBrowser.auth.signOut();
        router.replace('/auth/login');
    }

    return (
        <button onClick={signOut} className="text-sm">
            Çıkış
        </button>
    );
}