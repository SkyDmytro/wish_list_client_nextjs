import { createClient } from '@/utils/supabase/server';

import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json({ message: 'Supabase auth route is active' });
};

export const POST = async (request: Request) => {
  const supabase = await createClient();
  const { email, password } = await request.json();

  console.log('Auth Request:', { email, password });

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ user, session });
};
