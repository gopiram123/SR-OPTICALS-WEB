import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, ArrowUp, ArrowDown } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';
import { Category } from '../../types';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    order: 1,
    isVisible: true
  });

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      order: categories.length + 1,
      isVisible: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setFormData({
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      imageUrl: c.imageUrl,
      order: c.order,
      isVisible: c.isVisible
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug.trim() || formData.name.toLowerCase().replace(/\s+/g, '-');
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { ...formData, slug });
      } else {
        await createCategory({ ...formData, slug });
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (e) {
      console.error(e);
      alert('Error saving category.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleVisibility = async (cat: Category) => {
    try {
      await updateCategory(cat.id, { isVisible: !cat.isVisible });
      loadCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const moveOrder = async (cat: Category, direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? Math.max(1, cat.order - 1) : cat.order + 1;
    try {
      await updateCategory(cat.id, { order: newOrder });
      loadCategories();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Classification</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Category Management
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Manage optical product lines, cover imagery, display sequence, and public visibility.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-neutral-200/90 shadow-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Category Image Preview */}
                <div className="relative aspect-[4/3] bg-cream-200">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-brand-950/80 backdrop-blur-md text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Order: #{cat.order}
                  </div>
                  <button
                    onClick={() => toggleVisibility(cat)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full shadow-sm ${
                      cat.isVisible ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                    title={cat.isVisible ? 'Visible publicly' : 'Hidden'}
                  >
                    {cat.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-xl text-neutral-900">{cat.name}</h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {cat.description || 'No description entered.'}
                  </p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="p-4 bg-cream-100/70 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveOrder(cat, 'up')}
                    className="p-1.5 rounded-lg text-neutral-500 hover:bg-white hover:text-brand-900 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveOrder(cat, 'down')}
                    className="p-1.5 rounded-lg text-neutral-500 hover:bg-white hover:text-brand-900 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-brand-900 hover:bg-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-serif font-bold text-xl text-neutral-900">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Progressive Lenses"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Cover Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Display Sequence
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
                      <input
                        type="checkbox"
                        checked={formData.isVisible}
                        onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                        className="rounded text-brand-900 w-4 h-4"
                      />
                      <span>Visible Publicly</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
