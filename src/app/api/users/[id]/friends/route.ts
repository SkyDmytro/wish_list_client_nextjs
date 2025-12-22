import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '3');

  const { data: friendsData, error: friendsError } = await supabase
    .from('friends')
    .select('friend_id, users!friend_id(*)')
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (friendsError)
    return Response.json({ error: friendsError.message }, { status: 500 });

  const { count, error: countError } = await supabase
    .from('friends')
    .select('*', { count: 'exact' })
    .eq('user_id', id);

  if (countError)
    return Response.json({ error: countError.message }, { status: 500 });

  const { data: requestsSentData, error: requestsSentError } = await supabase
    .from('friend_requests')
    .select(
      'to_user_id, users!to_user_id(id, name, email, avatar, created_at, updated_at)',
    )
    .eq('from_user_id', id)
    .eq('status', 'pending');

  if (requestsSentError)
    return Response.json({ error: requestsSentError.message }, { status: 500 });

  const { data: requestsReceivedData, error: requestsReceivedError } =
    await supabase
      .from('friend_requests')
      .select(
        'from_user_id, users!from_user_id(id, name, email, avatar, created_at, updated_at)',
      )
      .eq('to_user_id', id)
      .eq('status', 'pending');

  if (requestsReceivedError)
    return Response.json(
      { error: requestsReceivedError.message },
      { status: 500 },
    );

  const friends = friendsData?.map((f) => f.users).filter(Boolean) || [];
  const requestsSent =
    requestsSentData?.map((r) => r.users).filter(Boolean) || [];
  const requestsReceived =
    requestsReceivedData?.map((r) => r.users).filter(Boolean) || [];

  return Response.json({
    items: {
      friends,
      requestsReceived,
      requestsSent,
    },
    total: count || 0,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id: friendId } = await params;
  const supabase = await createClient();
  const {
    data: { user: sessionUser },
  } = await supabase.auth.getUser();

  if (!sessionUser?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (sessionUser.id === friendId) {
    return Response.json(
      { error: 'You cannot add yourself as a friend' },
      { status: 400 },
    );
  }

  const { data: friendData } = await supabase
    .from('friends')
    .select('friend_id, user_id')
    .or(`friend_id.eq.${friendId},user_id.eq.${friendId}`)
    .or(`friend_id.eq.${sessionUser.id},user_id.eq.${sessionUser.id}`)
    .maybeSingle();

  if (friendData) {
    return Response.json({ error: 'You are already friends' }, { status: 400 });
  }

  const { data: friendRequestData } = await supabase
    .from('friend_requests')
    .select('from_user_id, to_user_id, id')
    .or(`from_user_id.eq.${friendId},to_user_id.eq.${friendId}`)
    .or(`from_user_id.eq.${sessionUser.id},to_user_id.eq.${sessionUser.id}`)
    .maybeSingle();

  if (friendRequestData) {
    if (friendRequestData.from_user_id === sessionUser.id) {
      return Response.json(
        { error: 'You have already sent a friend request to this user' },
        { status: 400 },
      );
    }
    if (friendRequestData.from_user_id === friendId) {
      const { error: updateError } = await supabase
        .from('friend_requests')
        .update({ status: 'accepted' })
        .eq('id', friendRequestData.id);

      if (updateError) {
        return Response.json({ error: updateError.message }, { status: 500 });
      }

      const { error: functionError } = await supabase.rpc('create_friendship', {
        user_id_param: sessionUser.id,
        friend_id_param: friendId,
      });

      if (functionError) {
        return Response.json({ error: functionError.message }, { status: 500 });
      }
    }
  } else {
    try {
      await supabase.from('friend_requests').insert({
        from_user_id: sessionUser.id,
        to_user_id: friendId,
      });
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 500 },
      );
    }
  }

  return Response.json({ message: 'Friend request sent' });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;
  return Response.json({ message: 'Hello, world!', id });
}
