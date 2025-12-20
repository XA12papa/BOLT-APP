export type Profile = {
  id: string;
  name: string;
  age: number;
  job?: string;
  bio?: string;
  image: string;
};

export const PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Luna',
    age: 24,
    job: 'Photographer',
    bio: 'Coffee lover • Traveler • Cat person',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  },
  {
    id: '2',
    name: 'Mateo',
    age: 29,
    job: 'Designer',
    bio: 'Designing experiences & exploring new cities',
    image: 'https://images.unsplash.com/photo-1545996124-8ba5b6d1d4b0?w=800&q=80',
  },
  {
    id: '3',
    name: 'Ava',
    age: 26,
    job: 'Developer',
    bio: 'Building small things that make people smile',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800&q=80',
  },
  {
    id: '4',
    name: 'Noah',
    age: 31,
    job: 'Chef',
    bio: 'Food, travel and late-night conversations',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80',
  },
  {
    id: '5',
    name: 'Maya',
    age: 28,
    job: 'Musician',
    bio: 'Songs, sunrises and spontaneous road trips',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&q=80',
  }
];