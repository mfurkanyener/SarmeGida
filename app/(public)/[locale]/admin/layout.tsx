// app/(public)/[locale]/admin/layout.tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { supabaseServerRead } from '@/lib/supabase/server';

type MaybePromise<T> = T | Promise<T>;

export default async function AdminLayout({
                                              children,
                                              params,
                                          }: {
    children: ReactNode;
    // Next 15: bazen promise, bazen sync; locale her zaman string
    params: MaybePromise<{ locale: string }>;
}) {
    const { locale } = await Promise.resolve(params); // her iki durumu da normalize et
    const supabase = await supabaseServerRead();

    // Doğrulanmış kullanıcıyı al
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect(`/${locale}/auth/login?redirect=/${locale}/admin`);
    }

    // Rol kontrolü
    let role: string | undefined =
        (user.app_metadata as { role?: string })?.role ??
        (user.user_metadata as { role?: string })?.role;

    if (!role) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();
        role = profile?.role;
    }

    if (role !== 'admin') {
        redirect(`/${locale}/auth/login`);
    }

    return <>{children}</>;
}