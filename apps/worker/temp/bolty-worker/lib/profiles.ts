    export type Profile = {
      id: string;
      name: string;
      age: number;
      bio: string;
      image: string;
    };

    const profiles: Profile[] = [
      {
        id: "1",
        name: "Ava",
        age: 24,
        bio: "Loves hiking, coffee shops and weekend getaways.",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: "2",
        name: "Noah",
        age: 27,
        bio: "Tech enthusiast, amateur chef, and vinyl collector.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "3",
        name: "Olivia",
        age: 22,
        bio: "Artist — museums, late-night pizza and small galleries.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "4",
        name: "Liam",
        age: 29,
        bio: "Traveler and amateur photographer. Ask me about my last trip.",
        image: "https://randomuser.me/api/portraits/men/76.jpg",
      },
      {
        id: "5",
        name: "Emma",
        age: 26,
        bio: "Yoga, reading, and big plant lover.",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
      },
      {
        id: "6",
        name: "Mason",
        age: 30,
        bio: "Coffee roaster and software engineer. Let's grab a latte.",
        image: "https://randomuser.me/api/portraits/men/66.jpg",
      },
      {
        id: "7",
        name: "Sophia",
        age: 23,
        bio: "Student, climber and documentary enthusiast.",
        image: "https://randomuser.me/api/portraits/women/56.jpg",
      },
      {
        id: "8",
        name: "Lucas",
        age: 28,
        bio: "Guitarist — always on the road for shows and coffee.",
        image: "https://randomuser.me/api/portraits/men/92.jpg",
      }
    ];

    export default profiles;
  