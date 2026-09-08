'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ImageIcon,
  ArrowLeft,
  Layers,
  Package,
  Sparkles,
  Plus,
  RefreshCw,
} from 'lucide-react';
import useGetAllCollections from '@/app/hooks/collection/useGetAllCollections';
import { useCreateProduct } from '@/app/hooks/products/useCreateProduct';
import { useUpdateProduct } from '@/app/hooks/products/useUpdateProduct';
import { useGetProduct } from '@/app/hooks/products/useGetProduct';
import { resolveApiAssetUrl } from '@/app/lib/config';

const PRESET_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'Free Size'];
const PRESET_COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy', 'Grey', 'Beige', 'Yellow', 'Purple', 'Brown', 'Silver', 'Gold'];

interface AddProductProps {
  productId?: string;
}

const AddProduct = ({ productId: propProductId }: AddProductProps) => {
  const searchParams = useSearchParams();
  const editId = propProductId || searchParams?.get('id') || undefined;
  const isEditMode = Boolean(editId);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [collectionId, setCollectionId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Sizes & Colors
  const [sizes, setSizes] = useState<string[]>([]);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [customColorInput, setCustomColorInput] = useState('');

  // Images
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // UI States
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Fetch Collections
  const {
    data: collectionsResponse,
    isLoading: isCollectionsLoading,
    isError: isCollectionsError,
  } = useGetAllCollections();

  const collections = collectionsResponse?.data ?? [];

  // Fetch Existing Product (if Edit Mode)
  const { data: existingProductResponse, isLoading: isFetchingProduct } = useGetProduct(editId);

  useEffect(() => {
    if (isEditMode && existingProductResponse?.data) {
      const p = existingProductResponse.data;
      setTitle(p.title || '');
      setSlug(p.slug || '');
      setDescription(p.description || '');
      setBrand(p.brand || '');
      setSku(p.sku || '');
      setPrice(p.price !== undefined ? String(p.price) : '');
      setDiscountPrice(p.discountPrice !== undefined && p.discountPrice !== null ? String(p.discountPrice) : '');
      setStock(p.stock !== undefined ? String(p.stock) : '0');
      setCollectionId(p.collectionId || '');
      setIsFeatured(Boolean(p.isFeatured));
      setIsActive(Boolean(p.isActive));
      setSizes(p.sizes || []);
      setColors(p.colors || []);
      setIsSlugManuallyEdited(true);

      if (p.thumbnail) {
        setThumbnailPreview(resolveApiAssetUrl(p.thumbnail) || p.thumbnail);
      }

      if (p.images && p.images.length > 0) {
        const resolved = p.images.map((img) => resolveApiAssetUrl(img) || img);
        setExistingImages(resolved);
      }
    }
  }, [isEditMode, existingProductResponse]);

  // Mutations
  const {
    mutate: createMutate,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateProduct();

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateProduct(editId || '');

  const isPending = isCreating || isUpdating;
  const apiError = (isEditMode ? updateError : createError) as Error | null;

  // Handlers
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w-]+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setIsSlugManuallyEdited(true);
  };

  const generateRandomSku = () => {
    const brandPrefix = (brand.trim() || 'PRD').substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setSku(`${brandPrefix}-${randomNum}`);
  };

  // Size toggles
  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const addCustomSize = () => {
    const trimmed = customSizeInput.trim();
    if (trimmed && !sizes.includes(trimmed)) {
      setSizes((prev) => [...prev, trimmed]);
      setCustomSizeInput('');
    }
  };

  // Color toggles
  const toggleColor = (color: string) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const addCustomColor = () => {
    const trimmed = customColorInput.trim();
    if (trimmed && !colors.includes(trimmed)) {
      setColors((prev) => [...prev, trimmed]);
      setCustomColorInput('');
    }
  };

  // Thumbnail handling
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('Thumbnail size must be less than 5MB');
      return;
    }

    setValidationError(null);
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };

  // Gallery images handling
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach((file) => {
      if (file.size <= 5 * 1024 * 1024) {
        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setGalleryFiles((prev) => [...prev, ...validFiles]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    const trimmedTitle = title.trim();
    const trimmedSlug = slug.trim();
    const trimmedBrand = brand.trim();
    const trimmedSku = sku.trim();
    const trimmedDescription = description.trim();
    const trimmedCollection = collectionId.trim();

    if (!trimmedTitle) {
      setValidationError('Product title is required');
      return;
    }
    if (!trimmedSlug) {
      setValidationError('Product slug is required');
      return;
    }
    if (!trimmedBrand) {
      setValidationError('Brand name is required');
      return;
    }
    if (!trimmedSku) {
      setValidationError('SKU is required');
      return;
    }
    if (!trimmedDescription) {
      setValidationError('Product description is required');
      return;
    }
    if (!trimmedCollection) {
      setValidationError('Please select a collection for this product');
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setValidationError('Please enter a valid product price');
      return;
    }

    const numDiscount = discountPrice.trim() ? parseFloat(discountPrice) : undefined;
    if (numDiscount !== undefined && (isNaN(numDiscount) || numDiscount < 0)) {
      setValidationError('Please enter a valid discount price');
      return;
    }
    if (numDiscount !== undefined && numDiscount >= numPrice) {
      setValidationError('Discount price must be less than the regular price');
      return;
    }

    const numStock = parseInt(stock, 10);
    if (isNaN(numStock) || numStock < 0) {
      setValidationError('Please enter a valid stock quantity');
      return;
    }

    if (!isEditMode && !thumbnailFile) {
      setValidationError('Product thumbnail image is required');
      return;
    }

    const payload = {
      title: trimmedTitle,
      slug: trimmedSlug,
      description: trimmedDescription,
      brand: trimmedBrand,
      sku: trimmedSku,
      price: numPrice,
      discountPrice: numDiscount,
      stock: numStock,
      collectionId: trimmedCollection,
      thumbnail: thumbnailFile,
      images: galleryFiles,
      sizes,
      colors,
      isFeatured,
      isActive,
    };

    if (isEditMode) {
      updateMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Product updated successfully!');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (err: any) => {
          setValidationError(err?.message || 'Failed to update product');
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Product created successfully!');
          setTitle('');
          setSlug('');
          setDescription('');
          setBrand('');
          setSku('');
          setPrice('');
          setDiscountPrice('');
          setStock('10');
          setCollectionId('');
          setSizes([]);
          setColors([]);
          setThumbnailFile(null);
          setThumbnailPreview('');
          setGalleryFiles([]);
          setGalleryPreviews([]);
          setIsSlugManuallyEdited(false);
          if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
          if (galleryInputRef.current) galleryInputRef.current.value = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (err: any) => {
          setValidationError(err?.message || 'Failed to create product');
        },
      });
    }
  };

  if (isEditMode && isFetchingProduct) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-500 text-sm">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/getproduct"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all products
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Package className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          {isEditMode
            ? 'Update product details, pricing, stock, or gallery images.'
            : 'Fill in the information below to create and publish a new product.'}
        </p>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
          <Link
            href="/getproduct"
            className="ml-auto text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
          >
            View all products →
          </Link>
        </div>
      )}

      {(validationError || (isEditMode ? isUpdateError : isCreateError)) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-medium">
            {validationError || apiError?.message || 'An error occurred while saving the product.'}
          </span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: General Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nike Air Zoom Pegasus 40"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. nike-air-zoom-pegasus-40"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nike, Sony, Apple"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-800">
                  SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateRandomSku}
                  className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Generate
                </button>
              </div>
              <input
                type="text"
                placeholder="e.g. NK-AZP-40-BLK"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Provide a detailed description of the product features, materials, and benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Collection Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Collection <span className="text-red-500">*</span>
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              disabled={isCollectionsLoading}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-60"
              required
            >
              <option value="">
                {isCollectionsLoading ? 'Loading collections...' : '-- Select Collection --'}
              </option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} {col.subcategory?.name ? `(${col.subcategory.name})` : ''}
                </option>
              ))}
            </select>
            {isCollectionsError && (
              <p className="mt-1 text-xs text-red-500">Failed to load collections.</p>
            )}
          </div>
        </div>

        {/* Card 2: Pricing & Inventory */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Regular Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="2999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Discount / Sale Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="2499 (optional)"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <p className="mt-1 text-xs text-gray-400">Leave blank if no discount</p>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="50"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Visibility / Status Toggles */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 accent-orange-500 rounded"
              />
              <div>
                <span className="font-semibold text-gray-900 text-sm block">Active Product</span>
                <span className="text-xs text-gray-400">Visible and purchasable in store</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-orange-500 rounded"
              />
              <div>
                <span className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Featured Product
                </span>
                <span className="text-xs text-gray-400">Highlight in home & featured carousels</span>
              </div>
            </label>
          </div>
        </div>

        {/* Card 3: Variants (Sizes & Colors) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            Product Variants
          </h2>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_SIZES.map((size) => {
                const isSelected = sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Custom size input */}
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add custom size (e.g. 32GB, 500ml)"
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomSize();
                  }
                }}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={addCustomSize}
                className="px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800"
              >
                Add
              </button>
            </div>

            {/* Selected sizes tags */}
            {sizes.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-gray-400 mr-1">Selected:</span>
                {sizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-medium"
                  >
                    {s}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => toggleSize(s)} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COLORS.map((col) => {
                const isSelected = colors.includes(col);
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => toggleColor(col)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-black text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>

            {/* Custom color input */}
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add custom color (e.g. Matte Olive, Coral)"
                value={customColorInput}
                onChange={(e) => setCustomColorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomColor();
                  }
                }}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={addCustomColor}
                className="px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800"
              >
                Add
              </button>
            </div>

            {/* Selected colors tags */}
            {colors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-gray-400 mr-1">Selected:</span>
                {colors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-medium"
                  >
                    {c}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => toggleColor(c)} />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Media Uploads */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            Product Images
          </h2>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Main Thumbnail Image <span className="text-red-500">*</span>
            </label>

            <div
              onClick={() => thumbnailInputRef.current?.click()}
              className="group border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-orange-50/20"
            >
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-orange-500 mb-3 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-orange-600 font-semibold">Click to upload thumbnail</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
              </div>
            </div>

            {/* Thumbnail Preview */}
            {thumbnailPreview && (
              <div className="mt-4 relative w-44 h-44 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors"
                  title="Remove thumbnail"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                  Main Thumbnail
                </div>
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Additional Gallery Images
            </label>

            <div
              onClick={() => galleryInputRef.current?.click()}
              className="group border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-orange-50/20"
            >
              <input
                ref={galleryInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleGalleryChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-orange-500 mb-3 transition-colors">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-orange-600 font-semibold">Click to upload gallery photos</span> (multiple allowed)
                </p>
                <p className="text-xs text-gray-400 mt-1">Up to 10 photos, max 5MB each</p>
              </div>
            </div>

            {/* Gallery Previews Grid */}
            {(existingImages.length > 0 || galleryPreviews.length > 0) && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Gallery Images ({existingImages.length + galleryPreviews.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {/* Existing Images */}
                  {existingImages.map((src, idx) => (
                    <div
                      key={`existing-${idx}`}
                      className="relative h-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group"
                    >
                      <img src={src} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Newly selected images */}
                  {galleryPreviews.map((src, idx) => (
                    <div
                      key={`new-${idx}`}
                      className="relative h-28 rounded-xl overflow-hidden border border-orange-200 bg-gray-100 group"
                    >
                      <img src={src} alt={`New upload ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryFile(idx)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                        New
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/getproduct"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditMode
              ? isPending
                ? 'Updating Product...'
                : 'Update Product'
              : isPending
                ? 'Creating Product...'
                : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
