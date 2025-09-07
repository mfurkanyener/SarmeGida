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
        <button onClick={signOut} className="bg-red-500 hover:bg-rd-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            Oturumu Kapat
        </button>
    );
}