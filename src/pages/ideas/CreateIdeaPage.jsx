import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Lightbulb,
  Compass,
  Zap,
  Users2,
  Clock,
  ShieldCheck,
  Save,
} from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { ideaService } from '../../services/ideaService';
import { CATEGORIES } from '../../data/mockIdeas';
import toast from 'react-hot-toast';

export const CreateIdeaPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: 'Tech & AI',
    stage: 'Just an idea',
    connectionType: 'Skill contribution',
    commitment: 'Part-time',
    requiredSkills: 'React, Node.js, UI/UX Design',
    targetHelpDescription: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const stages = [
    { id: 'Just an idea', title: 'Just an idea', desc: 'Raw thought, shower thought, or unsolved pain point.' },
    { id: 'Researching', title: 'Researching', desc: 'Reading papers, reviewing competitors, and gathering notes.' },
    { id: 'Planning', title: 'Planning', desc: 'Outlining user journeys, tech stack, and initial architecture.' },
    { id: 'Prototype', title: 'Prototype', desc: 'Have a clickable wireframe, mockups, or hardware breadboard.' },
    { id: 'Already building', title: 'Already building', desc: 'Codebase started, need help finishing features or fixing bugs.' },
  ];

  const connectionTypes = [
    { id: 'Co-founder', title: 'Co-founder', desc: 'Looking for a peer with equal ownership and long-term commitment.' },
    { id: 'Skill contribution', title: 'Skill contribution', desc: 'Need specialized code, design, or marketing execution.' },
    { id: 'Micro-help', title: 'Micro-help', desc: '15-minute quick code reviews, architecture critique, or advice.' },
    { id: 'Accountability partner', title: 'Accountability partner', desc: 'Pair up for weekly check-ins and shared shipping momentum.' },
    { id: 'Community', title: 'Community', desc: 'Early beta testers, user feedback, and cheerleaders.' },
  ];

  const commitments = ['Casual (3-5 hrs/wk)', 'Part-time (10-15 hrs/wk)', 'Full-time (30+ hrs/wk)'];

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Please provide an idea title';
      if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required';
      if (!formData.category) errs.category = 'Select a category';
    }
    if (step === 2) {
      if (!formData.stage) errs.stage = 'Select your current stage';
    }
    if (step === 3) {
      if (!formData.connectionType) errs.connectionType = 'Select what kind of help you need';
    }
    if (step === 4) {
      if (!formData.requiredSkills.trim()) errs.requiredSkills = 'Specify at least 1 or 2 required skills';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = async (status = 'published') => {
    try {
      setIsSubmitting(true);
      const newIdea = await ideaService.createIdea(
        {
          ...formData,
          status,
        },
        user
      );
      toast.success(status === 'published' ? 'Idea published to the community feed!' : 'Idea saved as draft');
      navigate(`/ideas/${newIdea.id}`);
    } catch (e) {
      toast.error('Failed to publish idea');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    'Basics',
    'Progress Stage',
    'Help Needed',
    'Skills & Commitment',
    'Preview & Publish',
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Wizard Header */}
      <div>
        <Link to="/ideas" className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-white mb-2 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to feed
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
          Share Your Incomplete Idea
        </h1>
        <p className="text-sm text-[#737373] mt-1">
          You don't need a business plan or polished pitch. Tell the community what you're thinking.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#FF7043] uppercase tracking-wider">
            Step {currentStep} of 5: {stepLabels[currentStep - 1]}
          </span>
          <span className="text-xs font-semibold text-[#737373]">
            {Math.round((currentStep / 5) * 100)}% Completed
          </span>
        </div>
        <div className="w-full h-2 bg-[#F2F1EC] rounded-full overflow-hidden flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex-1 h-full rounded-full transition-colors ${
                s <= currentStep ? 'bg-[#FF7043]' : 'bg-[#E8E7E0]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Step 1: Basic Information</h2>
              <p className="text-xs text-[#737373] mt-0.5">Give your idea an engaging title and a concise summary.</p>
            </div>

            <Input
              label="Idea Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Asynchronous Audio Notes for Engineering Mentors"
              error={errors.title}
              helperText="Make it specific to the pain point you are solving."
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={CATEGORIES.filter((c) => c !== 'All Categories')}
              error={errors.category}
            />

            <Textarea
              label="Short Elevator Pitch (1-2 sentences)"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              placeholder="What is the problem in 2 sentences? e.g. Scheduling 45m calls for a 2m question has high friction..."
              error={errors.shortDescription}
            />

            <Textarea
              label="Detailed Explanation / Rough Notes (Optional)"
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              rows={5}
              placeholder="Include whatever thoughts you have: who is this for? What architecture or tech might be used? What is unsolved?"
            />
          </div>
        )}

        {/* Step 2: Current Progress */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Step 2: How far along are you?</h2>
              <p className="text-xs text-[#737373] mt-0.5">Honesty here helps attract the right type of collaborator.</p>
            </div>

            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => setFormData({ ...formData, stage: stage.id })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.stage === stage.id
                      ? 'border-[#FF7043] bg-[#FFF0EB]/40 ring-1 ring-[#FF7043]'
                      : 'border-[#E8E7E0] hover:bg-[#F8F8F5] dark:hover:bg-[#262624]'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{stage.title}</h4>
                    <p className="text-xs text-[#737373] mt-0.5">{stage.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.stage === stage.id
                        ? 'bg-[#FF7043] border-[#FF7043] text-white'
                        : 'border-[#E8E7E0]'
                    }`}
                  >
                    {formData.stage === stage.id && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: What help do you need? */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Step 3: What kind of help do you need?</h2>
              <p className="text-xs text-[#737373] mt-0.5">Choose the primary connection type that fits your goals.</p>
            </div>

            <div className="space-y-3">
              {connectionTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setFormData({ ...formData, connectionType: type.id })}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.connectionType === type.id
                      ? 'border-[#FF7043] bg-[#FFF0EB]/40 ring-1 ring-[#FF7043]'
                      : 'border-[#E8E7E0] hover:bg-[#F8F8F5] dark:hover:bg-[#262624]'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{type.title}</h4>
                    <p className="text-xs text-[#737373] mt-0.5">{type.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      formData.connectionType === type.id
                        ? 'bg-[#FF7043] border-[#FF7043] text-white'
                        : 'border-[#E8E7E0]'
                    }`}
                  >
                    {formData.connectionType === type.id && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Skills and commitment */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-lg font-bold text-[#171717]">Step 4: Skills & Commitment Level</h2>
              <p className="text-xs text-[#737373] mt-0.5">Help people with the right backgrounds spot your listing.</p>
            </div>

            <Input
              label="Required Skills (comma separated)"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              placeholder="e.g. React Native, Web Audio API, UI Design, FastAPI"
              error={errors.requiredSkills}
              helperText="List tools, frameworks, or domain knowledge you are seeking."
            />

            <Select
              label="Desired Weekly Commitment"
              value={formData.commitment}
              onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
              options={commitments}
            />

            <Textarea
              label="Specific Blocker or Target Help Note"
              value={formData.targetHelpDescription}
              onChange={(e) => setFormData({ ...formData, targetHelpDescription: e.target.value })}
              rows={3}
              placeholder="e.g. Looking for someone comfortable with WebSocket audio chunking. Design is already 60% done in Figma."
            />
          </div>
        )}

        {/* Step 5: Preview and Publish */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
                <Check className="w-3.5 h-3.5" /> Ready for the Community
              </div>
              <h2 className="text-xl font-extrabold text-[#171717]">Review Your Listing</h2>
              <p className="text-xs text-[#737373] mt-0.5">Confirm details before publishing to the live explore feed.</p>
            </div>

            {/* Simulated Idea Card Preview */}
            <div className="p-5 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] space-y-4">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="default" size="sm">{formData.category}</Badge>
                <Badge variant="primary" size="sm">{formData.stage}</Badge>
                <Badge variant="lavender" size="sm">{formData.connectionType}</Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#171717]">{formData.title || 'Untitled Idea'}</h3>
                <p className="text-sm text-[#525252] mt-1.5 leading-relaxed">
                  {formData.shortDescription || 'No description provided.'}
                </p>
              </div>

              {formData.requiredSkills && (
                <div>
                  <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block mb-1">
                    Looking for:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.requiredSkills.split(',').map((s, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-white border border-[#E8E7E0] font-medium text-[#404040]">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#FFF0EB] border border-[#FFD8CC] text-xs text-[#525252] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#FF7043] shrink-0 mt-0.5" />
              <span>
                Once published, our AI Companion will immediately index your idea and cross-reference similar projects on Fuse to suggest collaborators!
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 mt-6 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-3">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleBack}
              icon={ArrowLeft}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="md"
              icon={Save}
              onClick={() => handlePublish('draft')}
              loading={isSubmitting}
            >
              Save Draft
            </Button>

            {currentStep < 5 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handlePublish('published')}
                loading={isSubmitting}
                icon={Flame}
              >
                Publish Idea
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
