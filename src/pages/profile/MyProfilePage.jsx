import React, { useState } from 'react';
import {
  User,
  Camera,
  Save,
  CheckCircle2,
  Sparkles,
  MapPin,
  Flame,
  Plus,
  X,
} from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const MyProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    title: user?.title || 'Full-Stack Developer & Product Builder',
    bio: user?.bio || 'Building human-centered digital experiences.',
    location: user?.location || 'Seattle, WA',
    commitment: user?.commitment || 'Part-time (15-20 hrs/wk)',
    availability: user?.availability || 'Open to new projects',
  });

  const [skills, setSkills] = useState(
    user?.skills || ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'UI/UX', 'Python']
  );
  const [newSkill, setNewSkill] = useState('');

  const [interests, setInterests] = useState(
    user?.interests || ['Future of Work', 'AI Assistants', 'Creative Tools', 'Community']
  );
  const [newInterest, setNewInterest] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter((i) => i !== interestToRemove));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await new Promise((r) => setTimeout(r, 400));
      updateUser({
        ...formData,
        skills,
        interests,
      });
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUploadSim = () => {
    toast.success('Profile avatar updated!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            My Public Builder Profile
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Update your bio, skills, and availability so founders and collaborators can find you.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          loading={isSaving}
          icon={Save}
          onClick={handleSaveProfile}
        >
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Profile Card & Avatar */}
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Identity & Photo
          </h3>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group">
              <Avatar
                src={user?.avatar}
                name={formData.name}
                size="2xl"
                className="ring-4 ring-[#FFF0EB]"
              />
              <button
                type="button"
                onClick={handlePhotoUploadSim}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#171717] text-white hover:bg-[#FF7043] transition-colors shadow-sm cursor-pointer"
                title="Change photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Display Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Seattle, WA or Remote"
                />
              </div>

              <Input
                label="Headline / Professional Role"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Full-Stack Developer & Product Builder"
              />

              <Textarea
                label="Personal Bio & What You Like Building"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell potential collaborators what problems excite you and how you contribute..."
              />
            </div>
          </div>
        </div>

        {/* Availability & Commitment */}
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Availability & Bandwidth
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Availability Status"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              options={[
                'Open to new projects',
                'Exploring ideas casually',
                'Focused on current team',
                'Available for micro-help only',
              ]}
            />

            <Select
              label="Weekly Commitment"
              value={formData.commitment}
              onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
              options={[
                'Casual (3-5 hrs/wk)',
                'Part-time (10-15 hrs/wk)',
                'Part-time (15-20 hrs/wk)',
                'Full-time (30+ hrs/wk)',
              ]}
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Skills & Superpowers
          </h3>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs font-semibold text-[#171717]"
              >
                {skill}
                <X
                  className="w-3.5 h-3.5 text-[#737373] hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemoveSkill(skill)}
                />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <Input
              placeholder="Add skill (e.g. Next.js, Figma)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={Plus}
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Interests & Domains Tag Management */}
        <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
            Interests & Topic Areas
          </h3>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0EB] border border-[#FFD8CC] text-xs font-semibold text-[#FF7043]"
              >
                {interest}
                <X
                  className="w-3.5 h-3.5 text-[#FF7043] hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemoveInterest(interest)}
                />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <Input
              placeholder="Add interest (e.g. Climate, EdTech)"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={Plus}
              onClick={handleAddInterest}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSaving}
            icon={Save}
          >
            Save Profile Updates
          </Button>
        </div>
      </form>
    </div>
  );
};
