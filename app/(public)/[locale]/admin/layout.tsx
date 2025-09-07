// app/(public)/[locale]/admin/layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { supabaseServerRead } from '@/lib/supabase/server';

export default async function AdminLayout({
                                              children,
                                              params,
                                          }: {
    children: ReactNode;
    params: { locale: 'tr' | 'en' };
}) {
    const supabase = await supabaseServerRead();

    // ✅ session yerine getUser: doğrulanmış kullanıcı
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect(`/${params.locale}/auth/login?redirect=/${params.locale}/admin`);
    }

    // 1) app_metadata.role
    let role: string | undefined = (user.app_metadata as { role?: string })?.role;

    // 2) profiles.role fallback (DB)
    if (!role) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();
        role = profile?.role ?? (user.user_metadata as { role?: string })?.role;
    }

    if (role !== 'admin') {
        redirect(`/${params.locale}/auth/login`);
    }

    return <>{children}</>;
}