// app/api/uploads/route.ts
import {NextResponse} from 'next/server';
import {supabaseServerAction} from '@/lib/supabase/server';



export async function POST(req: Request) {

    const supabase = await supabaseServerAction();
    const body = await req.json();

    return NextResponse.json({ok: true});
}