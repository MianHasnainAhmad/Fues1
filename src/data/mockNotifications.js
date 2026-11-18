export const mockNotifications = [
  {
    id: 'n1',
    type: 'collaboration_request',
    title: 'New Collaboration Request',
    message: 'Elena Rostova wants to join Cadence as an ML Sound Modeling Contributor.',
    time: '25m ago',
    read: false,
    category: 'requests',
    actionUrl: '/requests',
    sender: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      handle: '@elenarostova'
    }
  },
  {
    id: 'n2',
    type: 'request_accepted',
    title: 'Collaboration Accepted!',
    message: 'Sarah Chen accepted your collaboration proposal for Kinetic: Micro-Mentorship.',
    time: '2h ago',
    read: false,
    category: 'requests',
    actionUrl: '/teams/team-1',
    sender: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      handle: '@sarahchen'
    }
  },
  {
    id: 'n3',
    type: 'idea_comment',
    title: 'New Comment on Your Idea',
    message: 'David O\'Connor commented on "Cadence: Flow State Music": "Have you tested with Spotify Web Playback SDK?"',
    time: '5h ago',
    read: true,
    category: 'activity',
    actionUrl: '/ideas/idea-4',
    sender: {
      name: 'David O\'Connor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      handle: '@doconnor'
    }
  },
  {
    id: 'n4',
    type: 'idea_reaction',
    title: 'Idea Upvoted',
    message: 'Amina Nour and 14 others reacted to your idea "Cadence".',
    time: '1d ago',
    read: true,
    category: 'activity',
    actionUrl: '/ideas/idea-4',
    sender: {
      name: 'Amina Nour',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      handle: '@aminanour'
    }
  },
  {
    id: 'n5',
    type: 'task_assigned',
    title: 'New Task Assignment',
    message: 'Sarah Chen assigned you "Implement Opus codec client-side chunking in React" on Kinetic.',
    time: '1d ago',
    read: true,
    category: 'tasks',
    actionUrl: '/teams/team-1',
    sender: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      handle: '@sarahchen'
    }
  },
  {
    id: 'n6',
    type: 'milestone_updated',
    title: 'Milestone Completed 🎉',
    message: 'Marcus Vance marked "MQTT Broker Integration" as completed in BloomGrid.',
    time: '2d ago',
    read: true,
    category: 'tasks',
    actionUrl: '/teams/team-2',
    sender: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      handle: '@marcusv'
    }
  }
];

export const mockCollaborationRequests = [
  {
    id: 'req-1',
    direction: 'incoming', // incoming to current user
    ideaId: 'idea-4',
    ideaTitle: 'Cadence: Distraction-Free Flow State Music Synthesizer',
    sender: {
      id: 'u3',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      title: 'AI/ML Researcher & NLP Specialist',
      skills: ['PyTorch', 'DSP', 'Python', 'Audio Modeling'],
      reputationScore: 96
    },
    connectionType: 'Skill contribution',
    commitmentProposed: 'Casual (6-8 hrs/wk)',
    message: 'Hi Alex! I saw your idea about procedural ambient sound synthesis. In my graduate lab, we trained a lightweight latent audio diffusion model that creates seamless harmonic transitions. I would love to adapt it for your browser synth!',
    status: 'pending',
    createdAt: '25m ago'
  },
  {
    id: 'req-2',
    direction: 'incoming',
    ideaId: 'idea-4',
    ideaTitle: 'Cadence: Distraction-Free Flow State Music Synthesizer',
    sender: {
      id: 'u4',
      name: 'David O\'Connor',
      handle: '@doconnor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      title: 'Growth Marketer & Community Builder',
      skills: ['Growth Strategy', 'Product Hunt Launches', 'Copywriting'],
      reputationScore: 91
    },
    connectionType: 'Micro-help',
    commitmentProposed: 'Casual (2-4 hrs/wk)',
    message: 'Hey Alex, I run a 4,000-subscriber newsletter for indie software builders. When Cadence is in beta, I can feature an exclusive preview link to generate your first 500 alpha testers.',
    status: 'pending',
    createdAt: 'Yesterday'
  },
  {
    id: 'req-3',
    direction: 'sent', // sent by current user
    ideaId: 'idea-3',
    ideaTitle: 'ScribeScribe: Contextual AI Copilot for Clinical Trials',
    recipient: {
      id: 'u3',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      title: 'AI/ML Researcher'
    },
    connectionType: 'Skill contribution',
    commitmentProposed: 'Part-time (10 hrs/wk)',
    message: 'Hi Elena, I have deep experience building accessible UI component systems in React and Tailwind. I would love to help design the interactive timeline and spot-check quizzes for patient consent forms.',
    status: 'pending',
    createdAt: '3 days ago'
  },
  {
    id: 'req-4',
    direction: 'sent',
    ideaId: 'idea-1',
    ideaTitle: 'Kinetic: Micro-Mentorship via 5-Minute Audio Notes',
    recipient: {
      id: 'u1',
      name: 'Sarah Chen',
      handle: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      title: 'Product Designer & UX Researcher'
    },
    connectionType: 'Skill contribution',
    commitmentProposed: 'Part-time (15 hrs/wk)',
    message: 'Hey Sarah! Loved your breakdown of why scheduled Zoom mentorship calls fail. I can handle the frontend React and Web Audio chunking.',
    status: 'accepted',
    createdAt: '10 days ago'
  }
];
