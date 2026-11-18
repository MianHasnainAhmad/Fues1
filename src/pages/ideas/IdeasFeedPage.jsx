import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Grid,
  List,
  Sparkles,
  PlusCircle,
  Lightbulb,
  X,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { ideaService } from '../../services/ideaService';
import { CATEGORIES, STAGES, CONNECTION_TYPES } from '../../data/mockIdeas';

export const IdeasFeedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState('All Categories');
  const [stage, setStage] = useState('All Stages');
  const [connectionType, setConnectionType] = useState('All Connection Types');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    loadIdeas();
  }, [search, category, stage, connectionType, sortBy]);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const results = await ideaService.getIdeas({
        search,
        category,
        stage,
        connectionType,
        sortBy,
      });
      setIdeas(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All Categories');
    setStage('All Stages');
    setConnectionType('All Connection Types');
    setSortBy('latest');
    setSearchParams({});
  };

  const hasActiveFilters =
    search ||
    category !== 'All Categories' ||
    stage !== 'All Stages' ||
    connectionType !== 'All Connection Types';

  const visibleIdeas = ideas.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Explore Incomplete Ideas
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Browse raw concepts, unblock other creators, or offer micro-contributions.
          </p>
        </div>

        <Link to="/ideas/create">
          <Button variant="primary" size="md" icon={PlusCircle}>
            Publish Your Idea
          </Button>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                if (val) setSearchParams({ q: val });
                else setSearchParams({});
              }}
              onClear={() => {
                setSearch('');
                setSearchParams({});
              }}
              placeholder="Search by problem, technology (e.g. React, Audio, IoT), or keyword..."
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F8F8F5] border border-[#E8E7E0] rounded-xl py-2.5 px-3 text-xs sm:text-sm text-[#171717] font-medium focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 cursor-pointer"
            >
              <option value="latest">Sort: Latest</option>
              <option value="trending">Sort: Trending</option>
              <option value="most-supported">Sort: Most Supported</option>
            </select>

            {/* Grid / List toggle */}
            <div className="flex items-center rounded-xl bg-[#F8F8F5] p-1 border border-[#E8E7E0]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#FF7043] shadow-xs' : 'text-[#737373]'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-[#FF7043] shadow-xs' : 'text-[#737373]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="md:hidden p-2.5 rounded-xl border border-[#E8E7E0] bg-[#F8F8F5] text-[#525252]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Row (Category, Stage, Connection Type) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F0EFEA] ${
            showFiltersMobile ? 'grid' : 'hidden md:grid'
          }`}
        >
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORIES}
          />
          <Select
            label="Development Stage"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            options={STAGES}
          />
          <Select
            label="Help / Connection Type"
            value={connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            options={CONNECTION_TYPES}
          />
        </div>

        {/* Active Filters Clear Pills */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-2 text-xs flex-wrap">
            <span className="text-[#737373] font-medium">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF7043] border border-[#FFD8CC]">
                Keyword: "{search}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
              </span>
            )}
            {category !== 'All Categories' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EFFF] text-[#6C5CE7] border border-[#E4DCFF]">
                {category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('All Categories')} />
              </span>
            )}
            {stage !== 'All Stages' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                {stage}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setStage('All Stages')} />
              </span>
            )}
            {connectionType !== 'All Connection Types' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                {connectionType}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setConnectionType('All Connection Types')} />
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-[#737373] hover:text-[#171717] dark:hover:text-white font-semibold underline cursor-pointer ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Ideas Listing */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : ideas.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No incomplete ideas matched your filters"
          description="Try broadening your search query or reset your category and stage filters."
          actionLabel="Clear all filters"
          onAction={handleClearFilters}
        />
      ) : (
        <div className="space-y-6">
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'
            }
          >
            {visibleIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < ideas.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 3)}
              >
                Load More Ideas ({ideas.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
