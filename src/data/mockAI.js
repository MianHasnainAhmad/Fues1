export const generateMockAIAnalysis = (ideaInput) => {
  const title = ideaInput.title || 'Untitled Idea';
  const description = ideaInput.description || '';
  const text = `${title} ${description}`.toLowerCase();

  // Smart heuristic based on keywords
  let categorySuggestion = 'Tech & AI';
  let matchName = 'Kinetic: Micro-Mentorship';
  let matchId = 'idea-1';
  let similarityScore = 84;
  let creatorName = 'Sarah Chen';
  let creatorAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';
  let creatorRole = 'Product Designer';
  
  if (text.includes('farm') || text.includes('green') || text.includes('food') || text.includes('climate') || text.includes('plant')) {
    categorySuggestion = 'Climate & Sustainability';
    matchName = 'BloomGrid: Decentralized Urban Micro-Farming Hubs';
    matchId = 'idea-2';
    similarityScore = 89;
    creatorName = 'Marcus Vance';
    creatorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
    creatorRole = 'Full-Stack Engineer';
  } else if (text.includes('health') || text.includes('medical') || text.includes('doctor') || text.includes('mental') || text.includes('adhd')) {
    categorySuggestion = 'Health & Wellness';
    matchName = 'ScribeScribe: Contextual AI Copilot for Clinical Trials';
    matchId = 'idea-3';
    similarityScore = 78;
    creatorName = 'Elena Rostova';
    creatorAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80';
    creatorRole = 'AI Researcher';
  } else if (text.includes('audio') || text.includes('music') || text.includes('sound') || text.includes('creative') || text.includes('design')) {
    categorySuggestion = 'Creative & Design';
    matchName = 'Cadence: Distraction-Free Flow State Music Synthesizer';
    matchId = 'idea-4';
    similarityScore = 91;
    creatorName = 'Alex Morgan';
    creatorAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
    creatorRole = 'Full-Stack Developer';
  }

  return {
    submittedTitle: title,
    similarityScore,
    categorySuggestion,
    semanticConfidence: 'High (0.89 cosine distance on Fuse vector database)',
    summary: `Your proposal intersects strongly with community experiments around human-centered knowledge workflows. We discovered 1 high-overlap project and 2 complementary initiatives on Fuse.`,
    topMatch: {
      id: matchId,
      title: matchName,
      similarityScore,
      creator: {
        name: creatorName,
        avatar: creatorAvatar,
        role: creatorRole
      },
      commonGround: [
        'Both address asynchronous knowledge transfer without calendar overhead',
        'Shared focus on micro-incentives and community reputation feedback loops',
        'Targeting creative technical professionals as initial early adopters'
      ],
      keyDifferences: [
        `Your concept emphasizes written/snippet synthesis, whereas ${matchName} focuses purely on 90-second voice memos`,
        'Your idea proposes automated vector summarization, while their project relies on manual peer curation',
        'Different target monetization: B2B team licensing vs individual creator tips'
      ]
    },
    differentiationOpportunities: [
      {
        title: 'Focus on Zero-Setup Onboarding',
        description: 'Most competitors require both parties to download dedicated mobile apps. Building a lightweight web extension could capture 3x more initial interactions.'
      },
      {
        title: 'Explore AI-Assisted Follow-Up Actions',
        description: 'Automatically transcribing takeaways into actionable Kanban cards solves the "mentorship insight forgotten" drop-off.'
      },
      {
        title: 'Form an Alliance Instead of Competing',
        description: `The creator of ${matchName} is currently looking for collaborators with your exact background. Reaching out could save 4-6 months of redundant development.`
      }
    ],
    recommendedSkills: [
      'React & Tailwind CSS',
      'FastAPI / Django REST Framework',
      'Vector Embeddings (pgvector / Pinecone)',
      'WebSockets Realtime',
      'UI/UX Prototyping'
    ],
    relatedProjects: [
      {
        id: matchId,
        title: matchName,
        category: categorySuggestion,
        stage: 'Planning',
        matchPercent: similarityScore
      },
      {
        id: 'idea-6',
        title: 'NeuroPath: Gamified Accommodation Builder',
        category: 'Health & Wellness',
        stage: 'Researching',
        matchPercent: 64
      }
    ]
  };
};
