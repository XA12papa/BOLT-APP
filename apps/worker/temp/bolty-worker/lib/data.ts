export type Profile = {
  id: string;
  name: string;
  age: number;
  bio?: string;
  photo: string;
};

export const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "Ava",
    age: 26,
    bio: "Coffee lover • Hiker",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Liam",
    age: 29,
    bio: "Photographer • Traveler",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Mia",
    age: 24,
    bio: "Designer • Cat person",
    photo:
      "https://images.unsplash.com/photo-1545996124-36a5a5a6f2e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Noah",
    age: 31,
    bio: "Tech enthusiast",
    photo:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Zoe",
    age: 27,
    bio: "Chef • Foodie",
    photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Ethan",
    age: 30,
    bio: "Runner • Musician",
    photo:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80",
  },
];