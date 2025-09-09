// app/api/uploads/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerAction } from '@/lib/supabase/server';

export async function POST(req: Request) {
    void (await supabaseServerAction()); // side-effect için, atama yok
    void (await req.json());             // body’yi bilerek çöpe at
    return NextResponse.json({ ok: true });
}
