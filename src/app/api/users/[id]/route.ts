import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id: userId } = await params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  const supabase = await createClient();

  if (search) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, created_at, updated_at')
      .ilike('name', `%${search}%`);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ data });
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, email, avatar, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (userError)
    return Response.json({ error: userError.message }, { status: 500 });

  const { data: friendsData, error: friendsError } = await supabase
    .from('friends')
    .select(
      'friend_id, users!friend_id(id, name, email, avatar, created_at, updated_at)',
    )
    .eq('user_id', userId);

  if (friendsError)
    return Response.json({ error: friendsError.message }, { status: 500 });

  const { data: requestsSentData, error: requestsSentError } = await supabase
    .from('friend_requests')
    .select(
      'to_user_id, users!to_user_id(id, name, email, avatar, created_at, updated_at)',
    )
    .eq('from_user_id', userId)
    .eq('status', 'pending');

  if (requestsSentError)
    return Response.json({ error: requestsSentError.message }, { status: 500 });

  const { data: requestsReceivedData, error: requestsReceivedError } =
    await supabase
      .from('friend_requests')
      .select(
        'from_user_id, users!from_user_id(id, name, email, avatar, created_at, updated_at)',
      )
      .eq('to_user_id', userId)
      .eq('status', 'pending');

  if (requestsReceivedError)
    return Response.json(
      { error: requestsReceivedError.message },
      { status: 500 },
    );

  const data = {
    ...userData,
    friends: friendsData?.map((f) => f.users).filter(Boolean) || [],
    friend_requests_sent:
      requestsSentData?.map((r) => r.users).filter(Boolean) || [],
    friend_requests_received:
      requestsReceivedData?.map((r) => r.users).filter(Boolean) || [],
  };

  return Response.json({ data });
}
