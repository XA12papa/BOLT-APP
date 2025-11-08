import { NextResponse } from 'next/server';
import { likeUser, dislikeUser } from '../../../lib/users';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, action } = body as { userId: string; action?: 'like' | 'dislike' };
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    if (action === 'dislike') {
      dislikeUser(userId);
      return NextResponse.json({ ok: true });
    }

    const result = likeUser(userId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
  