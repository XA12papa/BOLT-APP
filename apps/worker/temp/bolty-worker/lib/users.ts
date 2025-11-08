export type User = {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  likedBack?: boolean;
};

const sampleUsers: User[] = [
  {
    id: 'u1',
    name: 'Ava',
    age: 24,
    bio: 'Avid hiker. Coffee snob. Dog parent.',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: true
  },
  {
    id: 'u2',
    name: 'Liam',
    age: 27,
    bio: 'Photographer. Always chasing golden hour.',
    photos: [
      'https://images.unsplash.com/photo-1531123414780-f8f0e3f6ecb9?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: false
  },
  {
    id: 'u3',
    name: 'Maya',
    age: 22,
    bio: 'Yogi • Baker • Traveler',
    photos: [
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: true
  },
  {
    id: 'u4',
    name: 'Noah',
    age: 29,
    bio: 'Tech nerd and amateur guitarist.',
    photos: [
      'https://images.unsplash.com/photo-1545996124-5f1eea4de0b5?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: false
  },
  {
    id: 'u5',
    name: 'Sofia',
    age: 26,
    bio: 'Plant mom. Weekend market explorer.',
    photos: [
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: true
  },
  {
    id: 'u6',
    name: 'Ethan',
    age: 31,
    bio: 'Coffee, code, repeat.',
    photos: [
      'https://images.unsplash.com/photo-1542131593-2c3a59f8f0e7?auto=format&fit=crop&w=800&q=80'
    ],
    likedBack: false
  }
];

const seen = new Set<string>();
const likes = new Set<string>();

export function getUsers(): User[] {
  return sampleUsers.filter((u) => !seen.has(u.id));
}

export function likeUser(userId: string): { match: boolean; user?: User } {
  seen.add(userId);
  likes.add(userId);
  const user = sampleUsers.find((u) => u.id === userId);
  const match = !!user?.likedBack;
  return { match, user };
}

export function dislikeUser(userId: string): { ok: boolean } {
  seen.add(userId);
  return { ok: true };
}
  