export const mockTeams = [
  {
    id: 'team-1',
    name: 'Kinetic Audio Pod',
    tagline: 'Asynchronous audio mentorship app and creator sprints',
    ideaId: 'idea-1',
    category: 'Education & Learning',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    currentStage: 'MVP Planning',
    currentStageIndex: 2, // 0: Idea, 1: Team Formed, 2: MVP Planning, 3: In Development, 4: Launched
    progressPercentage: 55,
    createdAt: '2 weeks ago',
    members: [
      {
        id: 'u1',
        name: 'Sarah Chen',
        role: 'Owner',
        title: 'Product Lead & Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'Founder'
      },
      {
        id: 'me',
        name: 'Alex Morgan',
        role: 'Contributor',
        title: 'Full-Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        joinedAt: '10 days ago'
      },
      {
        id: 'u2',
        name: 'Marcus Vance',
        role: 'Contributor',
        title: 'Systems & Audio Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        joinedAt: '1 week ago'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Define Core User Journey & Audio Bounds',
        stage: 'Idea',
        targetDate: 'Oct 15, 2026',
        completed: true,
        description: 'Complete Figma wireframes for 60-second question flow and 3-minute answer player.'
      },
      {
        id: 'm2',
        title: 'Assemble Core Founding Trio',
        stage: 'Team Formed',
        targetDate: 'Oct 28, 2026',
        completed: true,
        description: 'Onboard technical co-founder and systems backend lead via Fuse.'
      },
      {
        id: 'm3',
        title: 'Finalize Data Architecture & WebSocket Protocol',
        stage: 'MVP Planning',
        targetDate: 'Nov 20, 2026',
        completed: false,
        description: 'Define audio chunk compression (Opus) and real-time push notification payloads.'
      },
      {
        id: 'm4',
        title: 'Closed Beta with 50 Test Mentors',
        stage: 'In Development',
        targetDate: 'Dec 15, 2026',
        completed: false,
        description: 'Run 14-day sprint across 5 engineering communities with live voice memo exchanges.'
      },
      {
        id: 'm5',
        title: 'Public Web & iOS TestFlight Launch',
        stage: 'Launched',
        targetDate: 'Jan 30, 2027',
        completed: false,
        description: 'Open onboarding for tech and design communities.'
      }
    ],
    tasks: [
      {
        id: 't1',
        title: 'Design high-fidelity audio waveform visualizer component',
        description: 'Build an interactive canvas or SVG waveform component that scrubs smoothly on mobile touches.',
        status: 'Completed',
        priority: 'High',
        assignedTo: {
          id: 'u1',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        },
        dueDate: 'Nov 12, 2026'
      },
      {
        id: 't2',
        title: 'Implement Opus codec client-side chunking in React',
        description: 'Allow instant upload while recording without saving huge blobs in memory.',
        status: 'In Progress',
        priority: 'High',
        assignedTo: {
          id: 'me',
          name: 'Alex Morgan',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
        },
        dueDate: 'Nov 18, 2026'
      },
      {
        id: 't3',
        title: 'Set up automated S3 presigned URL generator in Django',
        description: 'Ensure secure 15-minute expiring upload tickets for recorded voice memos.',
        status: 'To Do',
        priority: 'Medium',
        assignedTo: {
          id: 'u2',
          name: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        dueDate: 'Nov 22, 2026'
      },
      {
        id: 't4',
        title: 'Draft community mentor code of conduct & moderation rules',
        description: 'Establish guidelines against unsolicited spam or sales pitches during audio sprints.',
        status: 'To Do',
        priority: 'Low',
        assignedTo: {
          id: 'u1',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        },
        dueDate: 'Nov 26, 2026'
      }
    ],
    decisionLogs: [
      {
        id: 'd1',
        title: 'Adopt Opus audio encoding instead of raw WAV/MP3',
        description: 'Reduced average 3-minute voice file size from 18MB to under 900KB, drastically improving mobile streaming in low-bandwidth scenarios.',
        author: {
          name: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        date: 'Nov 8, 2026'
      },
      {
        id: 'd2',
        title: 'Cap question audio length at strictly 90 seconds',
        description: 'User interviews proved that unbound questions led to rambling. A hard 90s ceiling forces the seeker to articulate the exact blocker.',
        author: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        },
        date: 'Nov 4, 2026'
      }
    ]
  },
  {
    id: 'team-2',
    name: 'BloomGrid Sensor Team',
    tagline: 'Balcony IoT sensors and urban produce barter network',
    ideaId: 'idea-2',
    category: 'Climate & Sustainability',
    coverImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=1200&auto=format&fit=crop&q=80',
    currentStage: 'In Development',
    currentStageIndex: 3,
    progressPercentage: 72,
    createdAt: '1 month ago',
    members: [
      {
        id: 'u2',
        name: 'Marcus Vance',
        role: 'Owner',
        title: 'Lead Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        joinedAt: 'Founder'
      },
      {
        id: 'me',
        name: 'Alex Morgan',
        role: 'Contributor',
        title: 'Frontend Lead',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        joinedAt: '3 weeks ago'
      }
    ],
    milestones: [
      {
        id: 'bm1',
        title: 'Hardware Sensor Breadboard v1',
        stage: 'Idea',
        targetDate: 'Sept 15, 2026',
        completed: true,
        description: 'ESP32 readings for soil moisture and sunlight.'
      },
      {
        id: 'bm2',
        title: 'MQTT Broker Integration',
        stage: 'Team Formed',
        targetDate: 'Oct 10, 2026',
        completed: true,
        description: 'Telemetry ingest via Mosquitto and PostgreSQL timescaledb.'
      },
      {
        id: 'bm3',
        title: 'Neighborhood Barter Dashboard',
        stage: 'In Development',
        targetDate: 'Nov 30, 2026',
        completed: false,
        description: 'Interactive map and yield trading interface.'
      }
    ],
    tasks: [
      {
        id: 'bt1',
        title: 'Build Leaflet/MapLibre map layer for urban planters',
        description: 'Show localized clusters of harvest availability without revealing exact private balcony addresses.',
        status: 'In Progress',
        priority: 'High',
        assignedTo: {
          id: 'me',
          name: 'Alex Morgan',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
        },
        dueDate: 'Nov 24, 2026'
      }
    ],
    decisionLogs: [
      {
        id: 'bd1',
        title: 'Obfuscate GPS to 200-meter hexagonal bins for privacy',
        description: 'Preserves grower privacy while allowing neighbors within walking distance to trade basil and tomatoes.',
        author: {
          name: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        date: 'Oct 20, 2026'
      }
    ]
  }
];

export const STAGE_STEPS = [
  'Idea',
  'Team Formed',
  'MVP Planning',
  'In Development',
  'Launched'
];
