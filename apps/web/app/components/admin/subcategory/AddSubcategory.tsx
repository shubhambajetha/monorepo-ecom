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
  Sparkles,
  Layers,
} from 'lucide-react';
import useGetAllCategory from '@/app/hooks/category/useGetAllCategory';
import useCreateSubCategory from '@/app/hooks/subcategory/useCreateSubCategory';
import useUpdateSubCategory from '@/app/hooks/subcategory/useUpdateSubCategory';
import useGetSubCategory from '@/app/hooks/subcategory/useGetSubCategory';

interface AddSubcategoryProps {
  subcategoryId?: string;
}

const AddSubcategory = ({ subcategoryId: propSubcategoryId }: AddSubcategoryProps) => {
  const searchParams = useSearchParams();
  const editId = propSubcategoryId || searchParams?.get('id') || undefined;
  const isEditMode = Boolean(editId);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories for dropdown
  const {
    data: categoryResponse,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategory();

  const categories = categoryResponse?.data ?? [];

  // If in edit mode, fetch existing subcategory details
  const { data: existingSubCategoryResponse, isLoading: isFetchingSubCategory } =
    useGetSubCategory(editId);

  useEffect(() => {
    if (isEditMode && existingSubCategoryResponse?.data) {
      const sub = existingSubCategoryResponse.data;
      setName(sub.name || '');
      setSlug(sub.slug || '');
      setCategoryId(sub.categoryId || '');
      setIsFeatured(Boolean(sub.isFeatured));
      if (sub.image) {
        setPreviewUrl(sub.image);
      }
    }
  }, [isEditMode, existingSubCategoryResponse]);

  // Mutations
  const {
    mutate: createMutate,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateSubCategory();

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateSubCategory(editId || '');

  const isPending = isCreating || isUpdating;
  const apiError = (isEditMode ? updateError : createError) as Error | null;

  // Auto-generate slug as name is typed
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]+/g, '');
    setSlug(generatedSlug);
  };

  // Image file select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
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

    if (!name.trim()) {
      setValidationError('Subcategory name is required.');
      return;
    }

    if (!slug.trim()) {
      setValidationError('Slug is required.');
      return;
    }

    if (!categoryId.trim()) {
      setValidationError('Please select a parent category.');
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      categoryId: categoryId.trim(),
      isFeatured,
      image,
    };

    if (isEditMode && editId) {
      updateMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Subcategory updated successfully!');
          setTimeout(() => setSuccessMessage(null), 4000);
        },
      });
    } else {
      createMutate(payload, {
        onSuccess: () => {
          setSuccessMessage('Subcategory created successfully!');
          setName('');
          setSlug('');
          setCategoryId('');
          setIsFeatured(false);
          setImage(null);
          setPreviewUrl('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setTimeout(() => setSuccessMessage(null), 4000);
        },
      });
    }
  };

  const handleReset = () => {
    setName('');
    setSlug('');
    setCategoryId('');
    setIsFeatured(false);
    setImage(null);
    setPreviewUrl('');
    setValidationError(null);
    setSuccessMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-[1450px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {isEditMode ? 'Edit Subcategory' : 'Add Subcategory'}
            </h1>
            {isEditMode && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Editing
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? 'Update subcategory information and category link'
              : 'Create a new subcategory and link it to a parent category'}
          </p>
        </div>

        <Link
          href="/getallsub"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          All Subcategories
        </Link>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <p className="flex-1 font-medium">{successMessage}</p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Validation / API Error Banner */}
      {(validationError || (isEditMode ? isUpdateError : isCreateError)) && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 animate-fadeIn">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="flex-1 font-medium">
            {validationError || apiError?.message || 'Failed to save subcategory. Please try again.'}
          </p>
          <button
            type="button"
            onClick={() => setValidationError(null)}
            className="text-red-700 hover:text-red-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {isFetchingSubCategory && isEditMode ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-500 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-black" />
            <p className="text-sm">Loading subcategory data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="categorySelect" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-gray-500" />
                  Parent Category <span className="text-red-500">*</span>
                </label>

                <select
                  id="categorySelect"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={isCategoriesLoading || isPending}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {isCategoriesLoading ? 'Loading categories...' : 'Select Parent Category'}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {isCategoriesError && (
                  <p className="text-xs text-red-500">
                    Could not load categories. Please refresh the page.
                  </p>
                )}

                {categories.length === 0 && !isCategoriesLoading && !isCategoriesError && (
                  <p className="text-xs text-amber-600">
                    No categories found. Please{' '}
                    <Link href="/create-category" className="underline font-medium hover:text-amber-800">
                      create a category
                    </Link>{' '}
                    first.
                  </p>
                )}
              </div>

              {/* Subcategory Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subcategoryName" className="text-sm font-medium text-gray-700">
                  Subcategory Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="subcategoryName"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Gaming Laptops, Men Sneakers"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition disabled:bg-gray-100"
                />
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subcategorySlug" className="text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  id="subcategorySlug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. gaming-laptops"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition disabled:bg-gray-100"
                />

                <p className="text-xs text-gray-400">
                  URL Preview: <span className="font-mono text-gray-600">/subcategory/{slug || 'subcategory-slug'}</span>
                </p>
              </div>

              {/* Featured Subcategory Toggle */}
              <div className="flex flex-col justify-center gap-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Featured Status
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    disabled={isPending}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div className="text-sm">
                    <span className="font-medium text-gray-800">Featured Subcategory</span>
                    <p className="text-xs text-gray-500">
                      Display on homepage showcases & featured category sections
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Upload Area */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Subcategory Image</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* Upload Drop Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-black/50 hover:bg-gray-50 transition text-center"
                  >
                    <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload subcategory image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="subcategoryImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isPending}
                    />
                  </div>

                  {/* Image Preview Box */}
                  <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 min-h-[140px] flex items-center justify-center">
                    {previewUrl ? (
                      <div className="relative group w-full flex flex-col items-center">
                        <div className="relative h-32 w-full max-w-[220px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                          <img
                            src={previewUrl}
                            alt="Subcategory Preview"
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition shadow"
                            title="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 truncate max-w-xs">
                          {image ? image.name : 'Current Image'}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 py-4">
                        <ImageIcon className="h-8 w-8 mb-1" />
                        <p className="text-xs">No image selected</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              {!isEditMode && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isPending}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Clear
                </button>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending
                  ? isEditMode
                    ? 'Updating Subcategory...'
                    : 'Creating Subcategory...'
                  : isEditMode
                    ? 'Save Changes'
                    : 'Create Subcategory'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddSubcategory;
