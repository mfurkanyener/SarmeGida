'use client';

import { createClient } from '@supabase/supabase-js';
// (opsiyonel) tip desteği için: import type { Database } from './types';

export const supabaseBrowser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    }
);

// Geriye dönük alias
export const supabaseClient = supabaseBrowser;