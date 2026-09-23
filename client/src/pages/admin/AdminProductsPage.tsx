import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Award,
  Flame,
  AlertTriangle,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../services/api';
import { Product, Category } from '../../types';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: 2999,
    description: '',
    category: 'Men',
    gender: 'Unisex' as Product['gender'],
    style: 'Classic' as Product['style'],
    frameType: 'Full Rim' as Product['frameType'],
    material: 'Acetate' as Product['material'],
    colour: 'Black',
    availability: 'In Stock' as Product['availability'],
    images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'],
    isNew: true,
    isFeatured: false,
    isTrending: false,
    sku: '',
    dimensions: '52-18-140'
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  const loadData = async () => {
    try {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 2999,
      description: '',
      category: categories[0]?.name || 'Men',
      gender: 'Unisex',
      style: 'Classic',
      frameType: 'Full Rim',
      material: 'Acetate',
      colour: 'Deep Black',
      availability: 'In Stock',
      images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'],
      isNew: true,
      isFeatured: false,
      isTrending: false,
      sku: `SRO-${Date.now().toString().slice(-4)}`,
      dimensions: '52-18-140'
    });
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      gender: p.gender,
      style: p.style,
      frameType: p.frameType,
      material: p.material,
      colour: p.colour,
      availability: p.availability,
      images: [...p.images],
      isNew: p.isNew,
      isFeatured: p.isFeatured,
      isTrending: p.isTrending,
      sku: p.sku || '',
      dimensions: p.dimensions || '52-18-140'
    });
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()]
    }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Please provide at least one product photograph.');
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving product', err);
      alert('Failed to save product.');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await deleteProduct(deleteCandidate.id);
      setDeleteCandidate(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  // Quick direct toggle functions
  const handleToggle = async (productId: string, field: 'isNew' | 'isFeatured' | 'isTrending', currentVal: boolean) => {
    try {
      await updateProduct(productId, { [field]: !currentVal });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header Bar */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Inventory Catalog</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              Product Management
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Add, edit, configure pricing, stock status, and flags for all eyewear frames.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Eyewear</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search frames by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-cream-100 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-900"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-neutral-500 font-semibold">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-cream-100 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800"
            >
              <option value="All">All Categories ({products.length})</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-200/70 border-b border-neutral-200 text-[11px] uppercase tracking-wider text-neutral-600 font-bold">
                  <th className="py-4 px-6">Frame</th>
                  <th className="py-4 px-4">Category & Style</th>
                  <th className="py-4 px-4">Price (INR)</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Flags</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-cream-100/60 transition-colors">
                    
                    {/* Frame image & name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-10 object-contain rounded-lg bg-cream-200 p-1 border border-neutral-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 text-sm">{p.name}</p>
                          <p className="text-[11px] text-neutral-400">
                            {p.sku || 'No SKU'} • {p.material} • {p.colour}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & Style */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-neutral-800 block">{p.category}</span>
                      <span className="text-[11px] text-gold-700 block">{p.style}</span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-serif font-bold text-sm text-brand-950">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.availability === 'Out of Stock'
                          ? 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {p.availability}
                      </span>
                    </td>

                    {/* Quick Flags */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleToggle(p.id, 'isNew', p.isNew)}
                          title={`New Arrival: ${p.isNew ? 'Active' : 'Inactive'}`}
                          className={`p-1.5 rounded-lg border transition-all ${
                            p.isNew ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white border-neutral-200 text-neutral-300'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggle(p.id, 'isFeatured', p.isFeatured)}
                          title={`Featured: ${p.isFeatured ? 'Active' : 'Inactive'}`}
                          className={`p-1.5 rounded-lg border transition-all ${
                            p.isFeatured ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-neutral-200 text-neutral-300'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggle(p.id, 'isTrending', p.isTrending)}
                          title={`Trending: ${p.isTrending ? 'Active' : 'Inactive'}`}
                          className={`p-1.5 rounded-lg border transition-all ${
                            p.isTrending ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white border-neutral-200 text-neutral-300'
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded-xl text-neutral-600 hover:text-brand-900 hover:bg-cream-200 transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(p)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="p-12 text-center text-neutral-500">
                No frames found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-serif font-bold text-xl text-neutral-900">
                  {editingProduct ? 'Edit Eyewear Details' : 'Add New Eyewear Frame'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                
                {/* Product Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SR Royal Obsidian Acetate"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      SKU / Model Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SRO-CL-801"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                {/* Price & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Price in INR (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Stock Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Made to Order">Made to Order</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Classification: Category, Gender, Style */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Aesthetic Style
                    </label>
                    <select
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    >
                      <option value="Classic">Classic</option>
                      <option value="Modern">Modern</option>
                      <option value="Premium">Premium</option>
                      <option value="Everyday">Everyday</option>
                    </select>
                  </div>
                </div>

                {/* Construction: Frame Type, Material, Colour, Dimensions */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Frame Type
                    </label>
                    <select
                      value={formData.frameType}
                      onChange={(e) => setFormData({ ...formData, frameType: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                    >
                      <option value="Full Rim">Full Rim</option>
                      <option value="Half Rim">Half Rim</option>
                      <option value="Rimless">Rimless</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Material
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                    >
                      <option value="Acetate">Acetate</option>
                      <option value="Titanium">Titanium</option>
                      <option value="Metal">Metal</option>
                      <option value="TR90">TR90</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Colour
                    </label>
                    <input
                      type="text"
                      value={formData.colour}
                      onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      placeholder="52-18-140"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-brand-900"
                    placeholder="Details about frame craftsmanship, barrel hinges, face shape suitability..."
                  />
                </div>

                {/* Image Management */}
                <div className="space-y-3 bg-cream-100 p-4 rounded-2xl border border-neutral-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Product Photographs
                  </label>
                  
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste Image URL (e.g. Unsplash or Cloud Storage)..."
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 rounded-xl bg-brand-900 text-gold-300 text-xs font-bold uppercase tracking-wider"
                    >
                      Add Photo
                    </button>
                  </div>

                  {/* Image previews */}
                  <div className="flex items-center gap-3 overflow-x-auto py-2">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-16 rounded-xl overflow-hidden bg-white p-1 border border-neutral-200 shrink-0 group">
                        <img src={img} alt="Product" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flags: New Arrival, Featured, Trending */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="rounded text-brand-900 w-4 h-4"
                    />
                    <span>New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded text-brand-900 w-4 h-4"
                    />
                    <span>Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                      className="rounded text-brand-900 w-4 h-4"
                    />
                    <span>Trending Frame</span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 font-bold text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-brand-900 hover:bg-brand-950 text-gold-300 font-bold text-xs uppercase tracking-wider"
                  >
                    Save Eyewear Frame
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-neutral-200 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h3 className="font-serif font-bold text-xl text-neutral-900">
                Confirm Product Deletion
              </h3>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-neutral-900">"{deleteCandidate.name}"</span>? This will remove the frame from customer catalog and wishlist.
              </p>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setDeleteCandidate(null)}
                  className="flex-1 py-3 rounded-full border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};
