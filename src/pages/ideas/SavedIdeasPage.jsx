import React, { useState, useEffect } from 'react';
import { Bookmark, Search, Lightbulb } from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { ideaService } from '../../services/ideaService';
import { CATEGORIES } from '../../data/mockIdeas';

export const SavedIdeasPage = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    try {
      setLoading(true);
      const res = await ideaService.getSavedIdeas();
      setSavedIdeas(res);
    } catch {
      console.error('Failed to load saved ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpdate = (updated) => {
    if (!updated.isSaved) {
      setSavedIdeas((prev) => prev.filter((i) => i.id !== updated.id));
    }
  };

  const filtered = savedIdeas.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            Saved Ideas & Bookmarks
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Projects you've flagged to follow, contribute to, or inspect later.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search within bookmarked ideas..."
          />
        </div>
        <div className="w-full sm:w-60">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORIES}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarked ideas"
          description="Click the bookmark icon on any card on the explore feed to save it here for reference."
          actionLabel="Explore Feed"
          onAction={() => window.location.assign('/ideas')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onSaveUpdate={handleSaveUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
