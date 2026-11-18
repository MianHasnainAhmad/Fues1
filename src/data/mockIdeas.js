export const mockIdeas = [
  {
    id: 'idea-1',
    title: 'Kinetic: Micro-Mentorship via 5-Minute Audio Notes',
    shortDescription: 'Asynchronous voice sprints where senior specialists unblock junior builders through threaded audio memos instead of 45-minute calendar bookings.',
    detailedDescription: 'Traditional mentorship is fundamentally broken by calendar friction. Busy engineers and founders hate scheduling 30-to-60-minute Zoom calls for a 3-minute question. Kinetic allows junior creators to record a 60-second screen capture or voice question, complete with code snippet links. A matched mentor gets notified and replies with a rich, bookmarkable 3-minute audio note during their commute or coffee break. We reward mentors with transparent micro-grants and community reputation points.',
    category: 'Education & Learning',
    creator: {
      id: 'u1',
      name: 'Sarah Chen',
      handle: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      title: 'Product Designer & UX Researcher',
      reputationScore: 98
    },
    stage: 'Planning',
    connectionType: 'Co-founder',
    commitment: 'Part-time',
    requiredSkills: ['React Native', 'WebSockets', 'Audio Processing', 'UI/UX Design', 'FastAPI'],
    likesCount: 142,
    isLiked: false,
    commentsCount: 24,
    isSaved: true,
    viewsCount: 1250,
    status: 'published',
    createdAt: '2 days ago',
    targetHelpDescription: 'Looking for a technical lead comfortable with streaming audio architecture and WebRTC/HLS. Design is 70% fleshed out in Figma.',
    comments: [
      {
        id: 'c1',
        author: {
          name: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          handle: '@marcusv'
        },
        createdAt: '1 day ago',
        content: 'This addresses a huge pain point. I mentor 5 people right now and scheduling is the biggest bottleneck. Would love to help set up the audio chunking pipeline.'
      },
      {
        id: 'c2',
        author: {
          name: 'Amina Nour',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
          handle: '@aminanour'
        },
        createdAt: '18 hours ago',
        content: 'I built an Expo audio waveform recorder last month for another project. Happy to open source the player module for this!'
      }
    ]
  },
  {
    id: 'idea-2',
    title: 'BloomGrid: Decentralized Urban Micro-Farming Hubs',
    shortDescription: 'IoT sensor network and hyper-local marketplace turning unused apartment balconies and rooftops into collaborative edible green corridors.',
    detailedDescription: 'Urban food systems waste colossal energy in cold chains and logistics. BloomGrid provides modular, low-cost smart planter kits equipped with moisture, sunlight, and nutrient sensors. Residents share automated harvest yields with neighbors via a localized barter exchange, earning credits redeemable at local grocery stores and farmers markets.',
    category: 'Climate & Sustainability',
    creator: {
      id: 'u2',
      name: 'Marcus Vance',
      handle: '@marcusv',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      title: 'Full-Stack & Systems Engineer',
      reputationScore: 94
    },
    stage: 'Prototype',
    connectionType: 'Skill contribution',
    commitment: 'Casual',
    requiredSkills: ['IoT Hardware', 'MQTT', 'React', 'Tailwind CSS', 'Embedded C++'],
    likesCount: 89,
    isLiked: true,
    commentsCount: 15,
    isSaved: false,
    viewsCount: 870,
    status: 'published',
    createdAt: '3 days ago',
    targetHelpDescription: 'We have working ESP32 sensor boards transmitting to an MQTT broker. We need a frontend wizard to build the neighborhood dashboard.',
    comments: [
      {
        id: 'c3',
        author: {
          name: 'David O\'Connor',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
          handle: '@doconnor'
        },
        createdAt: '2 days ago',
        content: 'I can connect you with 3 community garden cooperatives in East London who would be thrilled to beta test this.'
      }
    ]
  },
  {
    id: 'idea-3',
    title: 'ScribeScribe: Contextual AI Copilot for Clinical Trials',
    shortDescription: 'Automated synthesis tool bridging trial consent forms, complex medical jargon, and patient comprehension testing.',
    detailedDescription: 'Informed consent documents for oncology and immunology clinical trials average 40+ pages of dense regulatory language. Over 68% of patients sign without comprehending trial phases, risks, or dosage protocols. ScribeScribe translates IRB-approved protocols into interactive visual timelines with voice-assisted explanations and comprehension spot-checks.',
    category: 'Health & Wellness',
    creator: {
      id: 'u3',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      title: 'AI/ML Researcher & NLP Lead',
      reputationScore: 96
    },
    stage: 'Researching',
    connectionType: 'Co-founder',
    commitment: 'Full-time',
    requiredSkills: ['Bioinformatics', 'Python', 'Healthcare Compliance (HIPAA)', 'React', 'LLM Fine-tuning'],
    likesCount: 215,
    isLiked: false,
    commentsCount: 38,
    isSaved: true,
    viewsCount: 2400,
    status: 'published',
    createdAt: '5 days ago',
    targetHelpDescription: 'Seeking someone with regulatory or clinical healthcare background plus a frontend specialist for accessible UI/UX.',
    comments: []
  },
  {
    id: 'idea-4',
    title: 'Cadence: Distraction-Free Flow State Music Synthesizer',
    shortDescription: 'Generative ambient soundscapes calibrated directly to your GitHub commit velocity, writing typing speed, and heart-rate telemetry.',
    detailedDescription: 'Lo-fi beats and repetitive Spotify playlists create auditory fatigue after 2 hours. Cadence generates endless, non-repeating binaural and ambient frequency soundscapes that dynamically evolve based on user activity markers. If you hit a high-speed coding streak, the tempo softens to sustain focus without jarring changes.',
    category: 'Creative & Design',
    creator: {
      id: 'me',
      name: 'Alex Morgan',
      handle: '@alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      title: 'Full-Stack Developer & Product Builder',
      reputationScore: 97
    },
    stage: 'Already building',
    connectionType: 'Micro-help',
    commitment: 'Casual',
    requiredSkills: ['Web Audio API', 'Tone.js', 'React', 'Generative Algorithms', 'DSP'],
    likesCount: 168,
    isLiked: true,
    commentsCount: 19,
    isSaved: false,
    viewsCount: 1950,
    status: 'published',
    createdAt: '1 week ago',
    targetHelpDescription: 'Need a Sound Designer or Web Audio API enthusiast to review our procedural ambient synth engine curves.',
    comments: []
  },
  {
    id: 'idea-5',
    title: 'CivicForge: Open-Source Hyperlocal Ordinance Tracker',
    shortDescription: 'AI that reads city council meeting transcripts and notifies small business owners whenever zoning or permit laws change.',
    detailedDescription: 'Local city councils pass hundreds of municipal ordinances annually, buried in 300-page scanned PDF meeting minutes. Small bakery and retail owners only discover rule changes when inspectors show up with fines. CivicForge scrapes municipal portals, parses agenda items with LLMs, and delivers 3-bullet text updates to affected business categories.',
    category: 'Community & Social',
    creator: {
      id: 'u4',
      name: 'David O\'Connor',
      handle: '@doconnor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      title: 'Growth Marketer & Community Builder',
      reputationScore: 91
    },
    stage: 'Just an idea',
    connectionType: 'Accountability partner',
    commitment: 'Casual',
    requiredSkills: ['Web Scraping', 'OCR / Document Parsing', 'FastAPI', 'SMS API (Twilio)', 'Tailwind CSS'],
    likesCount: 76,
    isLiked: false,
    commentsCount: 11,
    isSaved: false,
    viewsCount: 650,
    status: 'published',
    createdAt: '1 week ago',
    targetHelpDescription: 'Looking for a civic-minded developer to build a proof-of-concept scraper for Austin & London council meetings.',
    comments: []
  },
  {
    id: 'idea-6',
    title: 'NeuroPath: Gamified Neurodiversity Accommodation Builder',
    shortDescription: 'Interactive workbench helping ADHD and autistic employees co-create personalized workplace accommodation agreements with HR.',
    detailedDescription: 'Requesting workplace accommodations is intimidating, stigmatizing, and often met with legalistic confusion. NeuroPath gamifies self-advocacy by translating individual cognitive styles (e.g. auditory sensitivity, focus batching, asynchronous communication needs) into clear, mutually beneficial working agreements.',
    category: 'Health & Wellness',
    creator: {
      id: 'u5',
      name: 'Amina Nour',
      handle: '@aminanour',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      title: 'Mobile Engineer & Accessibility Advocate',
      reputationScore: 95
    },
    stage: 'Planning',
    connectionType: 'Community',
    commitment: 'Part-time',
    requiredSkills: ['Product Strategy', 'HR Tech Experience', 'React', 'Accessibility (a11y)', 'Content Design'],
    likesCount: 312,
    isLiked: true,
    commentsCount: 52,
    isSaved: true,
    viewsCount: 3800,
    status: 'published',
    createdAt: '2 weeks ago',
    targetHelpDescription: 'Looking for HR professionals and occupational therapists to test early prompt templates and user flows.',
    comments: []
  },
  {
    id: 'idea-7',
    title: 'SkillSwap Protocol: Decentralized Peer-to-Peer Timebanking',
    shortDescription: 'Draft project exploring cryptographic verified time credits for barter of specialized knowledge without currency conversion.',
    detailedDescription: 'An experiment in valuing human hour exchange directly: 1 hour of senior React debugging for 1 hour of patent legal advice or 1 hour of professional audio mastering.',
    category: 'Tech & AI',
    creator: {
      id: 'me',
      name: 'Alex Morgan',
      handle: '@alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      title: 'Full-Stack Developer & Product Builder',
      reputationScore: 97
    },
    stage: 'Researching',
    connectionType: 'Co-founder',
    commitment: 'Part-time',
    requiredSkills: ['Smart Contracts', 'Cryptography', 'Zero Knowledge', 'React'],
    likesCount: 45,
    isLiked: false,
    commentsCount: 6,
    isSaved: false,
    viewsCount: 320,
    status: 'draft',
    createdAt: '3 days ago',
    targetHelpDescription: 'Need tokenomics researcher and ZK proof specialist.',
    comments: []
  },
  {
    id: 'idea-8',
    title: 'RetroDeck: Hardware Retro-Console Kit for High School STEM',
    shortDescription: 'Archived initial prototype for open-source Raspberry Pi gaming handheld kits.',
    detailedDescription: 'Early exploration into hands-on electronics kits teaching circuitry and Linux fundamentals through game emulation.',
    category: 'Education & Learning',
    creator: {
      id: 'me',
      name: 'Alex Morgan',
      handle: '@alexmorgan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      title: 'Full-Stack Developer & Product Builder',
      reputationScore: 97
    },
    stage: 'Prototype',
    connectionType: 'Micro-help',
    commitment: 'Casual',
    requiredSkills: ['Hardware', 'CAD 3D Printing', 'Python', 'Curriculum Design'],
    likesCount: 28,
    isLiked: false,
    commentsCount: 4,
    isSaved: false,
    viewsCount: 210,
    status: 'archived',
    createdAt: '2 months ago',
    targetHelpDescription: 'Project currently paused for curriculum realignment.',
    comments: []
  }
];

export const CATEGORIES = [
  'All Categories',
  'Tech & AI',
  'Climate & Sustainability',
  'Health & Wellness',
  'Education & Learning',
  'Creative & Design',
  'Community & Social'
];

export const STAGES = [
  'All Stages',
  'Just an idea',
  'Researching',
  'Planning',
  'Prototype',
  'Already building'
];

export const CONNECTION_TYPES = [
  'All Connection Types',
  'Co-founder',
  'Skill contribution',
  'Micro-help',
  'Accountability partner',
  'Community'
];

export const COMMITMENT_LEVELS = [
  'All Commitments',
  'Casual',
  'Part-time',
  'Full-time'
];
