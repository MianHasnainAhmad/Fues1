import React, { useState, useEffect } from 'react';
import {
  Tags,
  Plus,
  Search,
  Edit2,
  Trash2,
  Lightbulb,
  Users,
  CheckCircle,
  X,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminCategoryService } from '../../../services/adminCategoryService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', color: '#635BFF' });

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend' });

  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'category' | 'skill', item }

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cats, sks] = await Promise.all([
        adminCategoryService.getCategories(),
        adminCategoryService.getSkills(),
      ]);
      setCategories(cats);
      setSkills(sks);
    } catch {
      toast.error('Failed to load categories and skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;
    try {
      if (editingCategory) {
        await adminCategoryService.updateCategory(editingCategory.id, categoryForm);
        await adminActivityLogService.logAction('CATEGORY_UPDATED', `Category: ${categoryForm.name}`, 'Updated category metadata.', 'info');
        toast.success(`Category "${categoryForm.name}" updated`);
      } else {
        await adminCategoryService.createCategory(categoryForm);
        await adminActivityLogService.logAction('CATEGORY_CREATED', `Category: ${categoryForm.name}`, 'Created new category taxonomy.', 'info');
        toast.success(`Category "${categoryForm.name}" created`);
      }
      setCategoryModalOpen(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '', color: '#635BFF' });
      fetchData();
    } catch {
      toast.error('Failed to save category');
    }
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;
    try {
      await adminCategoryService.createSkill(skillForm);
      await adminActivityLogService.logAction('SKILL_TAG_CREATED', `Skill: ${skillForm.name}`, 'Created new skill tag.', 'info');
      toast.success(`Skill tag "${skillForm.name}" added`);
      setSkillModalOpen(false);
      setSkillForm({ name: '', category: 'Frontend' });
      fetchData();
    } catch {
      toast.error('Failed to save skill');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'category') {
        await adminCategoryService.deleteCategory(deleteTarget.item.id);
        await adminActivityLogService.logAction('CATEGORY_DELETED', `Category: ${deleteTarget.item.name}`, 'Deleted category.', 'danger');
        toast.success(`Category "${deleteTarget.item.name}" deleted`);
      } else {
        await adminCategoryService.deleteSkill(deleteTarget.item.id);
        await adminActivityLogService.logAction('SKILL_TAG_DELETED', `Skill: ${deleteTarget.item.name}`, 'Deleted skill tag.', 'danger');
        toast.success(`Skill tag "${deleteTarget.item.name}" deleted`);
      }
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Category & Skill Management"
        description="Organize platform taxonomy, curate official proposal categories, manage standardized skill tags, and audit keyword usage."
        breadcrumbs={[{ label: 'Categories & Skills' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => {
                setSkillForm({ name: '', category: 'Frontend' });
                setSkillModalOpen(true);
              }}
            >
              Add Skill Tag
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({ name: '', description: '', color: '#635BFF' });
                setCategoryModalOpen(true);
              }}
            >
              New Category
            </Button>
          </div>
        }
      />

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter categories or skill tags..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-white dark:bg-[#1A1A19] text-xs sm:text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500"
        />
      </div>

      {/* Idea Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Platform Idea Categories ({categories.length})
          </h3>
          <span className="text-xs text-[#71717A]">
            Official classification categories used across Fuse
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-4 transition-all hover:border-[#171717]/20"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h4 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                      {cat.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setCategoryForm({ name: cat.name, description: cat.description, color: cat.color });
                        setCategoryModalOpen(true);
                      }}
                      className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ type: 'category', item: cat })}
                      className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] line-clamp-2 leading-relaxed">
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-between text-xs">
                <span className="text-[#71717A] font-mono">/{cat.slug}</span>
                <span className="font-bold text-[#171717] dark:text-white flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#FF7043]" /> {cat.ideasCount} ideas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Management Section */}
      <div className="space-y-4 pt-4 border-t border-[#E8E7E0] dark:border-[#2B2B27]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Skill Tags & Badges ({skills.length})
            </h3>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] mt-0.5">
              Standardized creator proficiencies across engineering, design, and product
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs">
          <div className="flex flex-wrap gap-2.5">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] hover:border-stone-400 transition-colors"
              >
                <span className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-[#71717A] bg-white dark:bg-[#262624] px-1.5 py-0.2 rounded-md border border-[#E8E7E0] dark:border-[#2B2B27]">
                  {skill.usersCount} users
                </span>
                <button
                  onClick={() => setDeleteTarget({ type: 'skill', item: skill })}
                  className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-600 p-0.5 rounded transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Create/Edit Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Category Name</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. EdTech & Learning"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Brief description of this idea domain..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-[#E8E7E0] p-1"
                  />
                  <input
                    type="text"
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                    className="w-32 px-3 py-2 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setCategoryModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Create Modal */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                Add Skill Tag
              </h3>
              <button
                onClick={() => setSkillModalOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Flutter, PyTorch, Solana"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Discipline Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
                >
                  <option value="Frontend">Frontend Engineering</option>
                  <option value="Backend">Backend & Systems</option>
                  <option value="Design">UI/UX & Product Design</option>
                  <option value="AI & Data">AI, ML & Vector Data</option>
                  <option value="Marketing">Growth & Marketing</option>
                  <option value="Hardware">Hardware & IoT</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setSkillModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Skill Tag
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={
          deleteTarget?.type === 'category'
            ? `Delete Category "${deleteTarget?.item.name}"?`
            : `Delete Skill Tag "${deleteTarget?.item.name}"?`
        }
        description={
          deleteTarget?.type === 'category'
            ? 'Ideas classified under this category will need to be reclassified. This action cannot be reversed.'
            : 'This skill will be removed from future selection, though existing creator profiles will preserve custom entries.'
        }
        confirmText="Confirm Delete"
        danger
      />
    </div>
  );
};

export default AdminCategoriesPage;
