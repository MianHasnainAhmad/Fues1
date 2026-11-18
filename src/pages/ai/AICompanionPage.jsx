import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  GitCompare,
  Lightbulb,
  Users2,
  Cpu,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { aiService } from '../../services/aiService';
import { mockIdeas } from '../../data/mockIdeas';
import toast from 'react-hot-toast';

export const AICompanionPage = () => {
  const [searchParams] = useSearchParams();
  const seedId = searchParams.get('seed');

  const [selectedPreset, setSelectedPreset] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('Voice Notes for Engineering Mentors');
  const [ideaDescription, setIdeaDescription] = useState(
    'An asynchronous audio sprint tool where senior engineers unblock junior developers via 60-second audio memos and code snippet bookmarks instead of 45-minute scheduled Zoom meetings.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    if (seedId) {
      const match = mockIdeas.find((i) => i.id === seedId);
      if (match) {
        setIdeaTitle(match.title);
        setIdeaDescription(match.shortDescription);
      }
    }
    // Auto-run analysis for instant satisfying UX
    handleAnalyze();
  }, [seedId]);

  const handleSelectPreset = (e) => {
    const val = e.target.value;
    setSelectedPreset(val);
    const found = mockIdeas.find((i) => i.id === val);
    if (found) {
      setIdeaTitle(found.title);
      setIdeaDescription(found.shortDescription);
    }
  };

  const handleAnalyze = async () => {
    if (!ideaTitle.trim() && !ideaDescription.trim()) {
      toast.error('Please enter an idea title or description');
      return;
    }
    try {
      setIsAnalyzing(true);
      const res = await aiService.analyzeIdea({
        title: ideaTitle,
        description: ideaDescription,
      });
      setAnalysisResult(res);
    } catch {
      toast.error('AI analysis encountered an issue');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              AI Idea Companion & Similarity Detector
            </h1>
          </div>
          <p className="text-sm text-[#737373] mt-1">
            Detect overlapping concepts, avoid redundant effort, and identify differentiation opportunities across Fuse.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="lavender" size="md">
            RAG Vector Engine v2.4
          </Badge>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Idea Input & Preset Selector (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm space-y-5 lg:sticky lg:top-20">
          <div>
            <h3 className="text-base font-bold text-[#171717]">Input Your Idea</h3>
            <p className="text-xs text-[#737373] mt-0.5">
              Type your rough concept or pick one of your existing project drafts.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#404040] mb-1.5 uppercase tracking-wider">
              Or pick an existing project
            </label>
            <select
              value={selectedPreset}
              onChange={handleSelectPreset}
              className="w-full bg-[#F8F8F5] border border-[#E8E7E0] rounded-xl py-2 px-3 text-xs sm:text-sm text-[#171717] font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20"
            >
              <option value="">-- Choose from Community Ideas --</option>
              {mockIdeas.map((idea) => (
                <option key={idea.id} value={idea.id}>
                  {idea.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Idea Working Title"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            placeholder="e.g. Asynchronous Audio Sprints"
          />

          <Textarea
            label="Concept Description & Problem Scope"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            rows={6}
            placeholder="Describe who this is for, what pain point it solves, and what technology or approach you envision..."
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            loading={isAnalyzing}
            icon={Sparkles}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? 'Analyzing Semantic Overlap...' : 'Analyze Idea with AI'}
          </Button>

          {/* Context note */}
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-[11px] text-[#737373] flex items-start gap-2">
            <Cpu className="w-4 h-4 text-[#FF7043] shrink-0 mt-0.5" />
            <span>
              Connects to Django REST Framework embedding vectors. Computes cosine similarity across thousands of indexed concepts.
            </span>
          </div>
        </div>

        {/* Right Side: AI Similarity Analysis Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {isAnalyzing ? (
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-12 text-center shadow-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] text-[#FF7043] flex items-center justify-center mx-auto animate-bounce">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#171717]">Calculating Semantic Embeddings...</h3>
              <p className="text-xs sm:text-sm text-[#737373] max-w-sm mx-auto">
                Comparing concept tokens against the Fuse active idea vector index and scanning for potential collaborators.
              </p>
              <div className="w-48 h-2 bg-[#F2F1EC] rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-[#FF7043] rounded-full animate-pulse-subtle w-3/4" />
              </div>
            </div>
          ) : analysisResult ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Match Overview Score Card */}
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EFEA]">
                  <div>
                    <span className="text-xs font-bold text-[#FF7043] uppercase tracking-wider block">
                      Similarity Result
                    </span>
                    <h3 className="text-xl font-extrabold text-[#171717]">
                      {analysisResult.similarityScore}% Semantic Alignment Found
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                      {analysisResult.categorySuggestion}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#525252] leading-relaxed">
                  {analysisResult.summary}
                </p>

                {/* Similarity Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#737373]">Cosine Overlap with Community</span>
                    <span className="text-[#FF7043]">{analysisResult.similarityScore}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#F2F1EC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-[#FF7043] rounded-full transition-all duration-700"
                      style={{ width: `${analysisResult.similarityScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Top Existing Project Comparison */}
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-[#6C5CE7]" />
                    <h4 className="text-base font-bold text-[#171717]">Closest Existing Project on Fuse</h4>
                  </div>
                  <Link
                    to={`/ideas/${analysisResult.topMatch.id}`}
                    className="text-xs font-semibold text-[#FF7043] hover:underline"
                  >
                    View Project →
                  </Link>
                </div>

                {/* Overlapping Idea Card */}
                <div className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={analysisResult.topMatch.creator.avatar}
                      name={analysisResult.topMatch.creator.name}
                      size="md"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-[#171717]">
                        {analysisResult.topMatch.title}
                      </h5>
                      <p className="text-xs text-[#737373]">
                        Led by {analysisResult.topMatch.creator.name} ({analysisResult.topMatch.creator.role})
                      </p>
                    </div>
                  </div>
                  <Link to={`/ideas/${analysisResult.topMatch.id}`}>
                    <Button variant="outline" size="sm">
                      Inspect Idea
                    </Button>
                  </Link>
                </div>

                {/* Breakdown of Common Ground vs Differences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Common Ground */}
                  <div className="p-4 rounded-2xl bg-[#ECFDF5]/50 border border-[#A7F3D0] space-y-2.5">
                    <span className="text-xs font-bold text-[#059669] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Shared Similarities
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#404040]">
                      {analysisResult.topMatch.commonGround.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#059669] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Differences */}
                  <div className="p-4 rounded-2xl bg-[#FFFBEB]/50 border border-[#FDE68A] space-y-2.5">
                    <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> Key Differences
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#404040]">
                      {analysisResult.topMatch.keyDifferences.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D97706] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Differentiation Opportunities */}
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#FF7043]" />
                  <h4 className="text-base font-bold text-[#171717]">
                    Suggested Differentiation Opportunities
                  </h4>
                </div>

                <div className="space-y-3">
                  {analysisResult.differentiationOpportunities.map((opp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FFF0EB]/30 border border-[#FFD8CC] space-y-1"
                    >
                      <h5 className="text-xs font-bold text-[#FF7043] uppercase tracking-wide">
                        {opp.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                        {opp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Skills to Onboard */}
              <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-[#171717]">
                  Recommended Skills to Add to Your Team
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.recommendedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs font-semibold text-[#171717]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs text-[#737373] flex items-center justify-between">
                <span>
                  Semantic analysis generated by Fuse AI Companion. High similarity is an opportunity to partner up, not a barrier!
                </span>
                <Link to="/collaborators">
                  <Button variant="ghost" size="sm">
                    Find Collaborators →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E8E7E0] p-12 text-center shadow-sm">
              <Sparkles className="w-8 h-8 text-[#FF7043] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#171717]">Ready to Analyze</h3>
              <p className="text-sm text-[#737373] mt-1">
                Enter an idea on the left and click "Analyze Idea with AI".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
