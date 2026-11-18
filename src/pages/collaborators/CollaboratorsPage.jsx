import React, { useState, useEffect } from 'react';
import {
  Users2,
  Search,
  Filter,
  Sparkles,
  MapPin,
  CheckCircle2,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { UserCard } from '../../components/collaborators/UserCard';
import { userService } from '../../services/userService';

const SKILLS_LIST = [
  'All',
  'Figma',
  'UI/UX Design',
  'Python',
  'React',
  'Django',
  'FastAPI',
  'PyTorch',
  'React Native',
  'Growth Strategy',
  'Tailwind CSS',
];

const COMMITMENTS = ['All', 'Casual', 'Part-time', 'Full-time'];

const CONNECTION_TYPES = [
  'All',
  'Co-founder',
  'Skill contribution',
  'Micro-help',
  'Accountability partner',
  'Community',
];

export const CollaboratorsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('All');
  const [commitment, setCommitment] = useState('All');
  const [connectionType, setConnectionType] = useState('All');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [search, skill, commitment, connectionType]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getCollaborators({
        search,
        skill,
        commitment,
        connectionType,
      });
      setUsers(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearch('');
    setSkill('All');
    setCommitment('All');
    setConnectionType('All');
  };

  const hasActiveFilters = search || skill !== 'All' || commitment !== 'All' || connectionType !== 'All';

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Find Collaborators
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Discover engineers, product designers, AI researchers, and marketers ready to build.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            {users.length} Active Creators Available
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              onClear={() => setSearch('')}
              placeholder="Search by name, role (e.g. Lead UI, Full-Stack), or skill..."
            />
          </div>
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="md:hidden p-2.5 rounded-xl border border-[#E8E7E0] bg-[#F8F8F5] text-[#525252]"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Selects */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F0EFEA] ${
            showFiltersMobile ? 'grid' : 'hidden md:grid'
          }`}
        >
          <Select
            label="Filter by Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            options={SKILLS_LIST}
          />
          <Select
            label="Commitment Level"
            value={commitment}
            onChange={(e) => setCommitment(e.target.value)}
            options={COMMITMENTS}
          />
          <Select
            label="Collaboration Intent"
            value={connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            options={CONNECTION_TYPES}
          />
        </div>

        {/* Clear Filter Pills */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-2 text-xs flex-wrap">
            <span className="text-[#737373] font-medium">Filters active:</span>
            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
                "{search}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
              </span>
            )}
            {skill !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EFFF] text-[#6C5CE7] border border-[#E4DCFF]">
                Skill: {skill}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSkill('All')} />
              </span>
            )}
            {commitment !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                {commitment}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setCommitment('All')} />
              </span>
            )}
            {connectionType !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                {connectionType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setConnectionType('All')} />
              </span>
            )}
            <button
              onClick={handleClear}
              className="text-[#737373] hover:text-[#171717] dark:hover:text-white font-semibold underline cursor-pointer ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Collaborators Grid */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : users.length === 0 ? (
        <EmptyState
          icon={Users2}
          title="No collaborators found"
          description="Try broadening your skill or availability filters."
          actionLabel="Clear all filters"
          onAction={handleClear}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
