import React from 'react';
import { Link } from 'react-router-dom';
import { Users2, Shield, HeartHandshake, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';

export const CommunityPage = () => {
  const guidelines = [
    {
      title: 'No Idea Hoarding or Snark',
      desc: 'Ideas are cheap; execution and human chemistry are everything. Treat every unfinished concept with generosity and curiosity, not cynicism.'
    },
    {
      title: 'Respect Micro-Commitments',
      desc: 'If someone offers 2 hours of micro-help to review your database schema, honor their time. Provide concise context and do not expect full-time consulting.'
    },
    {
      title: 'Transparent Attribution',
      desc: 'Whenever an idea pivots or ships, credit all early contributors and advisors. Fuse profiles document your collaborative karma permanently.'
    },
    {
      title: 'Zero Solicitation or Spam',
      desc: 'Fuse is a community of builders, not a sales CRM. Unsolicited pitches for dev agencies or token sales will result in account termination.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-semibold">
              <Users2 className="w-3.5 h-3.5" />
              <span>Community Guidelines & Spirit</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
              The Fuse Community Charter
            </h1>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
              We are a global collective of students, founders, researchers, and creators bound by a mutual pledge of psychological safety and shared creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidelines.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8E7E0] p-6 shadow-sm hover-lift">
                <span className="text-xs font-mono font-bold text-[#FF7043] block mb-2">0{i + 1}</span>
                <h3 className="text-lg font-bold text-[#171717] mb-2">{g.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[#E8E7E0] p-8 sm:p-10 shadow-sm text-center space-y-5">
            <h2 className="text-2xl font-bold text-[#171717]">Looking to organize a local Fuse chapter?</h2>
            <p className="text-sm sm:text-base text-[#525252] max-w-lg mx-auto">
              We support in-person "Unfinished Idea Sprints" on university campuses and co-working spaces around the world.
            </p>
            <div className="pt-2">
              <Link to="/collaborators">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Find Local Collaborators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
