import { NextResponse } from 'next/server';
export async function POST() {
    // Burada Supabase / EmailJS / DB entegrasyonunu sonra bağlayacaksın
    return NextResponse.json({ ok: true });
}