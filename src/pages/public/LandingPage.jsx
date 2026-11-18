import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Zap,
  Coffee,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { mockIdeas } from '../../data/mockIdeas';

export const LandingPage = () => {
  const featuredIdeas = mockIdeas.slice(0, 3);

  const connectionTypes = [
    {
      title: 'Co-founder Matching',
      tagline: 'Equal skin in the game',
      icon: Users,
      description: 'Find a long-term partner with complementary skills (technical, design, domain) to share equity and build a scalable venture.',
      color: 'bg-[#FFF0EB] text-[#FF7043] border-[#FFD8CC]',
    },
    {
      title: 'Skill Contribution',
      tagline: 'Targeted expertise',
      icon: Zap,
      description: 'Get an engineer to set up your database, a designer to build your design system, or a marketer to set up your launch funnel.',
      color: 'bg-[#F3EFFF] text-[#6C5CE7] border-[#E4DCFF]',
    },
    {
      title: 'Micro-Help & Feedback',
      tagline: '15-minute unblockers',
      icon: Coffee,
      description: 'Ask for rapid code reviews, architecture sanity checks, or user feedback without the friction of endless scheduled calls.',
      color: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]',
    },
    {
      title: 'Accountability Partner',
      tagline: 'Stay consistent',
      icon: TrendingUp,
      description: 'Pair with another solo builder for weekly standups, milestone tracking, and shared momentum to keep shipping.',
      color: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]',
    },
    {
      title: 'Community Supporters',
      tagline: 'First 100 believers',
      icon: HeartHandshake,
      description: 'Gather early alpha testers, beta feedback, and cheerleaders who believe in your mission before writing the first line of code.',
      color: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Share an Incomplete Idea',
      description: 'Post your messy sketch, half-written spec, or unsolved problem. No polish or pitch deck required.',
      details: 'Choose what kind of help you need: co-founder, specific skill, quick critique, or accountability.',
    },
    {
      num: '02',
      title: 'Find Your People with AI',
      description: 'Our vector similarity engine matches your concept with creators who have the exact missing pieces.',
      details: 'Discover people already tackling related challenges and merge forces instead of reinventing the wheel.',
    },
    {
      num: '03',
      title: 'Build Something Real Together',
      description: 'Spin up a shared workspace with automated milestone tracking, lightweight Kanban tasks, and decision logs.',
      details: 'Move from "what if" to launch day with transparent contribution history and peer trust scores.',
    },
  ];

  const testimonials = [
    {
      quote: 'I had an IoT sensor concept for urban farming on a Google Doc for 9 months. Within 4 days of posting on Fuse, Marcus and Sarah joined me to build our first hardware prototype.',
      author: 'Elena Rostova',
      role: 'Graduate Researcher & Founder, BloomGrid',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
    {
      quote: 'As a backend engineer, I constantly abandon side projects because I dread UI design. On Fuse, I connected with a designer who just wanted someone to build her voice-memo app. It is the best collab experience of my career.',
      author: 'Marcus Vance',
      role: 'Systems Architect, Austin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      quote: 'The AI Similarity detector is magical. It showed me someone in London building the exact complement to my clinical consent tool. We saved 6 months of redundant engineering.',
      author: 'David O\'Connor',
      role: 'Product Strategist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF7043]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EB] border border-[#FFD8CC] text-[#FF7043] text-xs font-semibold animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Human-Centered Collaboration Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.15]">
              Great ideas don't have to start{' '}
              <span className="text-[#FF7043] underline decoration-[#FF7043]/30 underline-offset-8">
                complete.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl mx-auto">
              Your rough draft is someone else's missing puzzle piece. Fuse connects creators with unfinished concepts to developers, designers, and domain specialists ready to build together.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link to="/ideas/create" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" icon={ArrowRight} iconPosition="right">
                  Share Your Idea
                </Button>
              </Link>
              <Link to="/ideas" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={Compass}>
                  Explore Incomplete Ideas
                </Button>
              </Link>
            </div>

            {/* Social Proof metrics */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#737373]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Zero pitch decks required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>AI similarity match</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>100% Free for builders</span>
              </div>
            </div>
          </div>

          {/* Collaborative Visual Illustration / Product Preview Canvas */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-4 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EFEA] text-xs text-[#737373] gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-[#A3A3A3] truncate max-w-[120px] sm:max-w-none">fuse.live/ideas/kinetic-audio</span>
                </div>
                <div className="flex items-center gap-2 font-medium shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>3 Collaborators Active</span>
                </div>
              </div>

              {/* Mock Collaborative Canvas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stage 1 card */}
                <div className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-2.5">
                  <Badge variant="primary" size="sm">Idea Inception</Badge>
                  <h4 className="font-bold text-sm text-[#171717]">"Voice memos for engineering mentors"</h4>
                  <p className="text-xs text-[#525252]">Initial note by Sarah: Why does every 2-minute question require a 45-minute calendar invite?</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-[#737373]">
                    <span className="font-semibold text-[#FF7043]">Needs:</span> Audio codec dev
                  </div>
                </div>

                {/* Stage 2 card: AI Similarity bridge */}
                <div className="p-4 rounded-2xl bg-[#F3EFFF] border border-[#E4DCFF] space-y-2.5">
                  <Badge variant="lavender" size="sm">AI Similarity Match (88%)</Badge>
                  <h4 className="font-bold text-sm text-[#6C5CE7]">Found 2 complementary builders</h4>
                  <p className="text-xs text-[#525252]">Marcus (Systems/Opus) and Alex (React Frontend) were flagged working on identical audio chunking hurdles.</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-[#6C5CE7] font-semibold">
                    <Sparkles className="w-3 h-3" /> Auto-synthesized collaboration
                  </div>
                </div>

                {/* Stage 3 card: Active Workspace */}
                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2.5">
                  <Badge variant="green" size="sm">Sprint Workspace</Badge>
                  <h4 className="font-bold text-sm text-[#059669]">MVP Target: Dec 15</h4>
                  <p className="text-xs text-[#525252]">Task board synchronized: 8 tasks completed, decision logs locked, live audio waveform prototype verified.</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-[#059669] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for testflight
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Incomplete Ideas */}
      <section className="py-16 bg-white border-y border-[#E8E7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043] block mb-1">
                Live on the feed
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                Fresh ideas looking for collaborators
              </h2>
            </div>
            <Link to="/ideas">
              <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
                View All Community Ideas
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </section>

      {/* How Fuse Works: 3 Steps */}
      <section id="how-it-works" className="py-20 bg-[#F8F8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
              Frictionless Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              From raw thought to shipped project
            </h2>
            <p className="text-sm sm:text-base text-[#525252]">
              Traditional incubators demand polished business models. Fuse meets you where you actually are: with an unsolved problem and a drive to create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl border border-[#E8E7E0] p-8 shadow-sm hover-lift relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-[#FF7043]/30 font-mono block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-[#171717] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed mb-4">{step.description}</p>
                </div>
                <div className="pt-4 border-t border-[#F0EFEA] text-xs text-[#737373] leading-relaxed">
                  {step.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Connection Types Section */}
      <section className="py-20 bg-white border-t border-[#E8E7E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
              Collaboration Modes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Five ways to help without signing your life away
            </h2>
            <p className="text-sm sm:text-base text-[#525252]">
              Not every collaboration needs to be a 4-year equity marriage. Fuse supports flexible micro-commitments tailored to your current bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-[#F8F8F5] rounded-2xl border border-[#E8E7E0] p-6 hover-lift flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${type.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block mb-1">
                      {type.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-[#171717] mb-2">{type.title}</h3>
                    <p className="text-sm text-[#525252] leading-relaxed">{type.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Custom CTA Card */}
            <div className="bg-[#FFF0EB] rounded-2xl border border-[#FFD8CC] p-6 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#FF7043] text-white flex items-center justify-center mb-4 shadow-xs">
                  <Flame className="w-5 h-5 fill-white" />
                </div>
                <span className="text-[11px] font-semibold text-[#FF7043] uppercase tracking-wider block mb-1">
                  Ready to plug in?
                </span>
                <h3 className="text-lg font-bold text-[#171717] mb-2">Have a unique way to help?</h3>
                <p className="text-sm text-[#525252] leading-relaxed mb-6">
                  Create your profile with your specific skills and availability, and let idea creators discover you.
                </p>
              </div>
              <Link to="/register">
                <Button variant="primary" size="md" className="w-full">
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Statistics */}
      <section className="py-16 bg-[#171717] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF7043] font-mono mb-1">
                1,840+
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-medium">Incomplete Ideas Shared</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF7043] font-mono mb-1">
                3,400+
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-medium">Creators & Builders</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF7043] font-mono mb-1">
                720+
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-medium">Teams Successfully Formed</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF7043] font-mono mb-1">
                94%
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-medium">Response Rate to Proposals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043]">
              Stories from the Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              How real teams found their start on Fuse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F8F8F5] rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 flex flex-col justify-between hover-lift"
              >
                <p className="text-sm sm:text-base text-[#404040] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E8E7E0]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#E8E7E0]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{t.author}</h4>
                    <p className="text-xs text-[#737373]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-[#F8F8F5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FF7043] text-white flex items-center justify-center mx-auto shadow-md">
            <Flame className="w-7 h-7 fill-white" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            Stop waiting for your idea to be "ready".
          </h2>

          <p className="text-base sm:text-lg text-[#525252] max-w-xl mx-auto leading-relaxed">
            Join thousands of curious developers, designers, students, and entrepreneurs building the future one half-baked thought at a time.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto" icon={ArrowRight} iconPosition="right">
                Get Started Free
              </Button>
            </Link>
            <Link to="/ideas" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Active Ideas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
