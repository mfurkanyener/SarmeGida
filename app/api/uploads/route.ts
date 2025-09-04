// app/api/contact/route.ts
import {NextResponse} from 'next/server';
import {supabaseServer} from '@/lib/supabase/server';



export async function POST(req: Request) {

    const supabase = await supabaseServer();
    const body = await req.json();

    return NextResponse.json({ok: true});
}