export const mockConversations = [
  {
    id: 'conv-1',
    user: {
      id: 'u1',
      name: 'Sarah Chen',
      handle: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      status: 'online',
      title: 'Product Designer'
    },
    projectContext: 'Kinetic: Micro-Mentorship',
    lastMessage: 'I just uploaded the updated mobile Figma frames for the audio memo scrubber!',
    lastMessageTime: '12m ago',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'u1',
        text: 'Hey Alex! Glad to have you onboard for Kinetic. We really needed someone comfortable with browser audio.',
        timestamp: '10:30 AM',
        isMe: false
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Thrilled to join! I looked over the flow and the concept of a 90-second voice memo limit is pure genius.',
        timestamp: '10:34 AM',
        isMe: true
      },
      {
        id: 'm3',
        senderId: 'u1',
        text: 'Exactly! It keeps answers concise and respectful of senior engineers time.',
        timestamp: '10:36 AM',
        isMe: false
      },
      {
        id: 'm4',
        senderId: 'u1',
        text: 'I just uploaded the updated mobile Figma frames for the audio memo scrubber!',
        timestamp: '10:48 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-2',
    user: {
      id: 'u2',
      name: 'Marcus Vance',
      handle: '@marcusv',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: 'offline',
      title: 'Systems & Backend'
    },
    projectContext: 'BloomGrid Sensor Hubs',
    lastMessage: 'The MQTT broker broker is deployed on the test cluster. Let me know when you test websocket feeds.',
    lastMessageTime: '2h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'mb1',
        senderId: 'u2',
        text: 'Hey Alex, quick question about the neighborhood planter map component.',
        timestamp: 'Yesterday 3:15 PM',
        isMe: false
      },
      {
        id: 'mb2',
        senderId: 'me',
        text: 'Hey Marcus! Sure, what do you need?',
        timestamp: 'Yesterday 3:20 PM',
        isMe: true
      },
      {
        id: 'mb3',
        senderId: 'u2',
        text: 'The MQTT broker is deployed on the test cluster. Let me know when you test websocket feeds.',
        timestamp: 'Yesterday 3:25 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv-3',
    user: {
      id: 'u3',
      name: 'Elena Rostova',
      handle: '@elenarostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      status: 'online',
      title: 'AI/ML Researcher'
    },
    projectContext: 'Cadence Flow Synth',
    lastMessage: 'Looking forward to reviewing your ambient audio frequency curves!',
    lastMessageTime: '1d ago',
    unreadCount: 0,
    messages: [
      {
        id: 'me1',
        senderId: 'u3',
        text: 'Hi Alex! Just sent over a collaboration request for Cadence. Your idea caught my eye on the feed.',
        timestamp: 'Nov 14, 4:10 PM',
        isMe: false
      },
      {
        id: 'me2',
        senderId: 'me',
        text: 'Hi Elena! Thanks so much. I read your research profile on latent audio diffusion—phenomenal work.',
        timestamp: 'Nov 14, 4:15 PM',
        isMe: true
      },
      {
        id: 'me3',
        senderId: 'u3',
        text: 'Looking forward to reviewing your ambient audio frequency curves!',
        timestamp: 'Nov 14, 4:22 PM',
        isMe: false
      }
    ]
  }
];
