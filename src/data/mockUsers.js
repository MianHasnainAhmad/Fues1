export const mockUsers = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    handle: '@sarahchen',
    email: 'sarah.chen@fuse.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    title: 'Product Designer & Design Systems Thinker',
    bio: 'Obsessed with turning messy whiteboard concepts into sleek, intuitive micro-interactions. Looking to team up with technical co-founders building climate-tech or education tools.',
    location: 'San Francisco, CA & Remote',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research', 'Design Systems'],
    interests: ['Climate Tech', 'EdTech', 'Productivity', 'Human-Computer Interaction'],
    commitment: 'Part-time (15-20 hrs/wk)',
    connectionTypes: ['Co-founder', 'Skill contribution', 'Micro-help'],
    reputationScore: 98,
    availability: 'Available for collaboration',
    ideasSharedCount: 4,
    collaborationsCount: 12,
    teamsJoinedCount: 3,
    contributionsCount: 28,
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Alex Rivera',
        reviewerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Sarah brought our chaotic wireframes to life in under 48 hours. Absolute clarity and empathy for user psychology.'
      },
      {
        id: 'r2',
        reviewerName: 'Priya Sharma',
        reviewerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '1 month ago',
        comment: 'Tremendous attention to detail. She helped us pivot our user onboarding flow and our sign-up completion doubled.'
      }
    ],
    collaborationHistory: [
      { project: 'EcoHarvest Tracker', role: 'Lead UI/UX', status: 'Launched' },
      { project: 'NeuroNotes AI', role: 'Product Design Advisor', status: 'In MVP' },
      { project: 'CivicPulse', role: 'Micro-help Contributor', status: 'Completed' }
    ]
  },
  {
    id: 'u2',
    name: 'Marcus Vance',
    handle: '@marcusv',
    email: 'marcus.v@fuse.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    title: 'Full-Stack Engineer & Distributed Systems Lead',
    bio: 'Ex-startup tech lead. Love building snappy real-time websockets, Python AI pipelines, and clean REST APIs. Got an idea with big data or hard technical challenges? Ping me.',
    location: 'Austin, TX',
    skills: ['Python', 'Django', 'React', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    interests: ['AI Infrastructure', 'Open Source', 'Developer Tools', 'Fintech'],
    commitment: 'Casual (5-10 hrs/wk)',
    connectionTypes: ['Skill contribution', 'Accountability partner', 'Micro-help'],
    reputationScore: 94,
    availability: 'Open to high-impact projects',
    ideasSharedCount: 6,
    collaborationsCount: 15,
    teamsJoinedCount: 4,
    contributionsCount: 42,
    reviews: [
      {
        id: 'r3',
        reviewerName: 'Marcus Vance',
        reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Spun up our backend and WebSocket chat server in one weekend. Solid clean code with zero fluff.'
      }
    ],
    collaborationHistory: [
      { project: 'Synapse Flow', role: 'Backend Lead', status: 'Active' },
      { project: 'LocalBazaar', role: 'Architecture Advisor', status: 'Launched' }
    ]
  },
  {
    id: 'u3',
    name: 'Elena Rostova',
    handle: '@elenarostova',
    email: 'elena.rostova@fuse.io',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
    title: 'AI/ML Researcher & NLP Specialist',
    bio: 'Masters student researching multi-agent reasoning, semantic embeddings, and small language models. Looking for engineers and domain experts in healthcare and bio-tech.',
    location: 'Boston, MA & Remote',
    skills: ['PyTorch', 'NLP', 'LangChain', 'Vector DBs', 'Python', 'Data Science'],
    interests: ['HealthTech', 'RAG Systems', 'Bioinformatics', 'Cognitive Science'],
    commitment: 'Full-time (30+ hrs/wk)',
    connectionTypes: ['Co-founder', 'Skill contribution'],
    reputationScore: 96,
    availability: 'Actively seeking co-founders',
    ideasSharedCount: 2,
    collaborationsCount: 8,
    teamsJoinedCount: 2,
    contributionsCount: 19,
    reviews: [],
    collaborationHistory: [
      { project: 'BioQuery Search', role: 'ML Lead', status: 'MVP Planning' }
    ]
  },
  {
    id: 'u4',
    name: 'David O\'Connor',
    handle: '@doconnor',
    email: 'david.oc@fuse.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    title: 'Growth Marketer & Community Builder',
    bio: 'Helping early ventures find their first 1,000 true believers. Passionate about community flywheel mechanics, brand storytelling, and viral content loops.',
    location: 'London, UK & Remote',
    skills: ['Growth Strategy', 'Copywriting', 'SEO', 'Community Ops', 'Funnels'],
    interests: ['Creator Economy', 'Social Platforms', 'B2B SaaS', 'Education'],
    commitment: 'Casual (5-10 hrs/wk)',
    connectionTypes: ['Micro-help', 'Community', 'Accountability partner'],
    reputationScore: 91,
    availability: 'Available for advisory & feedback',
    ideasSharedCount: 5,
    collaborationsCount: 18,
    teamsJoinedCount: 5,
    contributionsCount: 31,
    reviews: [],
    collaborationHistory: [
      { project: 'PodCraft Studio', role: 'Head of Growth', status: 'Launched' }
    ]
  },
  {
    id: 'u5',
    name: 'Amina Nour',
    handle: '@aminanour',
    email: 'amina.nour@fuse.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    title: 'Mobile Engineer (React Native & Swift)',
    bio: 'Crafting fluid 60fps mobile interfaces with gesture navigation and offline-first persistence. Passionate about wellness, accessibility, and indie hacking.',
    location: 'Toronto, Canada',
    skills: ['React Native', 'Swift', 'TypeScript', 'Expo', 'Tailwind', 'GraphQL'],
    interests: ['Mental Health', 'Mobile First', 'Accessibility', 'Habits'],
    commitment: 'Part-time (15-20 hrs/wk)',
    connectionTypes: ['Co-founder', 'Skill contribution'],
    reputationScore: 95,
    availability: 'Available for collaboration',
    ideasSharedCount: 3,
    collaborationsCount: 11,
    teamsJoinedCount: 3,
    contributionsCount: 24,
    reviews: [],
    collaborationHistory: [
      { project: 'BreatheQuiet', role: 'Lead Mobile Dev', status: 'Launched' }
    ]
  }
];

export const currentMockUser = {
  ...mockUsers[0],
  id: 'me',
  isCurrentUser: true,
  email: 'alex.morgan@fuse.io',
  name: 'Alex Morgan',
  handle: '@alexmorgan',
  title: 'Full-Stack Developer & Product Builder',
  bio: 'Building human-centered digital experiences. Currently exploring asynchronous collaboration tools and generative design workflows.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
  location: 'Seattle, WA',
  skills: ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'UI/UX', 'Python'],
  interests: ['Future of Work', 'AI Assistants', 'Creative Tools', 'Community'],
  commitment: 'Part-time (15-20 hrs/wk)',
  connectionTypes: ['Co-founder', 'Skill contribution', 'Micro-help'],
  reputationScore: 97,
  availability: 'Open to new projects',
  profileCompletion: 85,
  ideasSharedCount: 3,
  collaborationsCount: 9,
  teamsJoinedCount: 2,
  contributionsCount: 34
};
