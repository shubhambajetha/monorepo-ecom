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
} from 'lucide-react';
import useGetAllSubCategory from '@/app/hooks/subcategory/useGetAllSubCategory';
import useCreateCollection from '@/app/hooks/collection/useCreateCollection';
import useUpdateCollection from '@/app/hooks/collection/useUpdateCollection';
import useGetCollection from '@/app/hooks/collection/useGetCollection';
import { resolveApiAssetUrl } from '@/app/lib/config';

interface AddCollectionProps {
  collectionId?: string;
}

const AddCollection = ({ collectionId: propCollectionId }: AddCollectionProps) => {
  const searchParams = useSearchParams();
  const editId = propCollectionId || searchParams?.get('id') || undefined;
  const isEditMode = Boolean(editId);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch subcategories for dropdown
  const {
    data: subcategoryResponse,
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoriesError,
  } = useGetAllSubCategory();

  const subcategories = subcategoryResponse?.data ?? [];

  // Fetch existing collection if editing
  const { data: existingCollectionResponse, isLoading: isFetchingCollection } =
    useGetCollection(editId);

  useEffect(() => {
    if (isEditMode && existingCollectionResponse?.data) {
      const col = existingCollectionResponse.data;
      setName(col.name || '');
      setSlug(col.slug || '');
      setSubcategoryId(col.subcategoryId || '');
      setIsSlugManuallyEdited(true);
      if (col.bannerImage) {
        setPreviewUrl(resolveApiAssetUrl(col.bannerImage) || col.bannerImage);
      }
    }
  }, [isEditMode, existingCollectionResponse]);

  // Mutations
  const {
    mutate: createMutate,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateCollection();

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCollection(editId || '');

  const isPending = isCreating || isUpdating;
  const apiError = (isEditMode ? updateError : createError) as Error | null;

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setName(val);
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

  // Image file select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('Banner image size must be less than 5MB');
      return;
    }

    setValidationError(null);
    setBannerImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setBannerImage(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    const trimmedName = name.trim();
    const trimmedSlug = slug.trim();
    const trimmedSubcategory = subcategoryId.trim();

    if (!trimmedName) {
      setValidationError('Collection name is required');
      return;
    }

    if (!trimmedSlug) {
      setValidationError('Collection slug is required');
      return;
    }

    if (!trimmedSubcategory) {
      setValidationError('Please select a parent subcategory');
      return;
    }

    const payload = {
      name: trimmedName,
      slug: trimmedSlug,
      subcategoryId: trimmedSubcategory,
      bannerImage,
    };

    if (isEditMode) {
      updateMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Collection updated successfully!');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (err: any) => {
          setValidationError(err?.message || 'Failed to update collection');
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Collection created successfully!');
          setName('');
          setSlug('');
          setSubcategoryId('');
          setBannerImage(null);
          setPreviewUrl('');
          setIsSlugManuallyEdited(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: (err: any) => {
          setValidationError(err?.message || 'Failed to create collection');
        },
      });
    }
  };

  if (isEditMode && isFetchingCollection) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-3" />
        <p className="text-gray-500 text-sm">Loading collection details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/getcollection"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all collections
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Collection' : 'Create New Collection'}
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          {isEditMode
            ? 'Update collection details, parent subcategory, or banner image.'
            : 'Add a new product collection to group products within a subcategory.'}
        </p>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-sm font-medium">{successMessage}</span>
          <Link
            href="/getcollection"
            className="ml-auto text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
          >
            View all collections →
          </Link>
        </div>
      )}

      {(validationError || (isEditMode ? isUpdateError : isCreateError)) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-medium">
            {validationError || apiError?.message || 'An error occurred while saving the collection.'}
          </span>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Collection Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Collection Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Wireless Gaming Headsets"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. wireless-gaming-headsets"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                URL identifier for this collection
              </p>
            </div>
          </div>

          {/* Subcategory Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Parent Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              disabled={isSubcategoriesLoading}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-60"
              required
            >
              <option value="">
                {isSubcategoriesLoading ? 'Loading subcategories...' : '-- Select Parent Subcategory --'}
              </option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} {sub.category?.name ? `(${sub.category.name})` : ''}
                </option>
              ))}
            </select>
            {isSubcategoriesError && (
              <p className="mt-1 text-xs text-red-500">
                Failed to load subcategories. Please refresh or create a subcategory first.
              </p>
            )}
            {!isSubcategoriesLoading && subcategories.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No subcategories found. You need to create a subcategory before creating a collection.
              </p>
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Collection Banner Image
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group border-2 border-dashed border-gray-300 hover:border-orange-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-orange-50/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-orange-500 mb-3 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-orange-600 font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP or GIF (max 5MB)</p>
              </div>
            </div>

            {/* Banner Preview */}
            {previewUrl && (
              <div className="mt-4 relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group">
                <img
                  src={previewUrl}
                  alt="Collection Banner Preview"
                  className="w-full h-56 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors backdrop-blur-sm"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Banner Preview
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
            <Link
              href="/getcollection"
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditMode
                ? isPending
                  ? 'Updating Collection...'
                  : 'Update Collection'
                : isPending
                  ? 'Creating Collection...'
                  : 'Create Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
