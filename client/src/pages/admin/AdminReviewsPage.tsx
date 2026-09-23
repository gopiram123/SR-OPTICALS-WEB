import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, CheckCircle } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getReviews, createReview, updateReview, deleteReview } from '../../services/api';
import { Review } from '../../types';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    date: 'Recent',
    verified: true,
    isVisible: true
  });

  const loadReviews = async () => {
    try {
      const data = await getReviews(false);
      setReviews(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      customerName: '',
      rating: 5,
      comment: '',
      date: 'Recent',
      verified: true,
      isVisible: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: Review) => {
    setEditingReview(r);
    setFormData({
      customerName: r.customerName,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      verified: r.verified ?? true,
      isVisible: r.isVisible
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview.id, formData);
      } else {
        await createReview(formData);
      }
      setIsModalOpen(false);
      loadReviews();
    } catch (e) {
      console.error(e);
      alert('Failed to save review.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from "${name}"?`)) return;
    try {
      await deleteReview(id);
      loadReviews();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleVisibility = async (r: Review) => {
    try {
      await updateReview(r.id, { isVisible: !r.isVisible });
      loadReviews();
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
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Testimonials</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Customer Review Moderation
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Approve, edit, hide or publish verified customer feedback displayed on the homepage.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => toggleVisibility(r)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase flex items-center gap-1 ${
                      r.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {r.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{r.isVisible ? 'Live' : 'Hidden'}</span>
                  </button>
                </div>

                <p className="text-xs text-neutral-700 italic leading-relaxed">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{r.customerName}</p>
                  <p className="text-[10px] text-neutral-400">{r.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(r)}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-brand-900 hover:bg-cream-100 transition-colors"
                    title="Edit review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id, r.customerName)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-5 shadow-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-serif font-bold text-xl text-neutral-900">
                  {editingReview ? 'Edit Review' : 'Add Customer Review'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Review Comment *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm"
                    placeholder="Testimonial details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Date Display
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-neutral-300 text-xs"
                      placeholder="e.g. 2 weeks ago"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
                      <input
                        type="checkbox"
                        checked={formData.isVisible}
                        onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                        className="rounded text-brand-900 w-4 h-4"
                      />
                      <span>Publicly Visible</span>
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
                    Save Review
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
