'use client';

import React, { useState } from 'react';

interface FormData {
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: string;
  discountPrice: string;
  stock: string;
  thumbnail: string;
  images: string;
  sizes: string;
  colors: string;
  collectionId: string;
  isFeatured: boolean;
  isActive: boolean;
}

const AddProduct = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    brand: '',
    sku: '',
    price: '',
    discountPrice: '',
    stock: '',
    thumbnail: '',
    images: '',
    sizes: '',
    colors: '',
    collectionId: '',
    isFeatured: false,
    isActive: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
   
      if (name === 'title') {
        updated.slug = generateSlug(value);
      }
      return updated;
    });

    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Product title is required.';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required.';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0)
      newErrors.price = 'Enter a valid price.';
    if (
      formData.discountPrice &&
      (isNaN(Number(formData.discountPrice)) || Number(formData.discountPrice) < 0)
    )
      newErrors.discountPrice = 'Enter a valid discount price.';
    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price))
      newErrors.discountPrice = 'Discount price must be less than the original price.';
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0)
      newErrors.stock = 'Enter a valid stock quantity.';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      await new Promise((res) => setTimeout(res, 1200));
      console.log('Submitted:', formData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      brand: '',
      sku: '',
      price: '',
      discountPrice: '',
      stock: '',
      thumbnail: '',
      images: '',
      sizes: '',
      colors: '',
      collectionId: '',
      isFeatured: false,
      isActive: true,
    });
    setErrors({});
  };

 
  const Field = ({
    label,
    name,
    required,
    children,
    hint,
  }: {
    label: string;
    name: keyof FormData;
    required?: boolean;
    children: React.ReactNode;
    hint?: string;
  }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !errors[name] && <p className="text-xs text-gray-400">{hint}</p>}
      {errors[name] && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const inputClass = (name: keyof FormData) =>
    `w-full px-3 py-2 text-sm border rounded-lg bg-white text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <span>Dashboard</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="text-indigo-600 font-medium">Add Product</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-500 text-sm mt-1">
              Fill in the details below to list a new product in your store.
            </p>
          </div>
          {submitSuccess && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Product added successfully!
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            {/* Section 1: Basic Information */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-800">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Product Title" name="title" required>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Premium Wireless Headphones"
                      className={inputClass('title')}
                    />
                  </Field>
                </div>

                <Field
                  label="Slug"
                  name="slug"
                  required
                  hint="Auto-generated from title. Edit if needed."
                >
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="premium-wireless-headphones"
                    className={inputClass('slug')}
                  />
                </Field>

                <Field label="Brand" name="brand">
                  <input
                    id="brand"
                    name="brand"
                    type="text"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Sony, Apple, Nike"
                    className={inputClass('brand')}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Description" name="description">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write a detailed product description..."
                      className={`${inputClass('description')} resize-none`}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* Section 2: Pricing & Inventory */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-800">Pricing & Inventory</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Price (₹)" name="price" required>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      ₹
                    </span>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={`${inputClass('price')} pl-7`}
                    />
                  </div>
                </Field>

                <Field
                  label="Discount Price (₹)"
                  name="discountPrice"
                  hint="Leave empty if no discount"
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      ₹
                    </span>
                    <input
                      id="discountPrice"
                      name="discountPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={`${inputClass('discountPrice')} pl-7`}
                    />
                  </div>
                </Field>

                <Field label="Stock Quantity" name="stock" required>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className={inputClass('stock')}
                  />
                </Field>

                <Field label="SKU" name="sku" required hint="Unique product identifier">
                  <input
                    id="sku"
                    name="sku"
                    type="text"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. WH-1000XM5-BLK"
                    className={inputClass('sku')}
                  />
                </Field>

                <Field label="Collection ID" name="collectionId" hint="Assign to a collection">
                  <input
                    id="collectionId"
                    name="collectionId"
                    type="text"
                    value={formData.collectionId}
                    onChange={handleChange}
                    placeholder="e.g. electronics-2024"
                    className={inputClass('collectionId')}
                  />
                </Field>
              </div>
            </section>

            {/* Section 3: Media */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-800">Media</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Thumbnail URL" name="thumbnail" hint="Main product image URL">
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass('thumbnail')}
                  />
                </Field>

                <Field label="Additional Images" name="images" hint="Comma-separated image URLs">
                  <input
                    id="images"
                    name="images"
                    type="text"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="https://…jpg, https://…jpg"
                    className={inputClass('images')}
                  />
                </Field>
              </div>
            </section>

            {/* Section 4: Variants */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-800">Variants</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Available Sizes" name="sizes" hint="Comma-separated: S, M, L, XL">
                  <input
                    id="sizes"
                    name="sizes"
                    type="text"
                    value={formData.sizes}
                    onChange={handleChange}
                    placeholder="S, M, L, XL, XXL"
                    className={inputClass('sizes')}
                  />
                </Field>

                <Field
                  label="Available Colors"
                  name="colors"
                  hint="Comma-separated: Red, Blue, Black"
                >
                  <input
                    id="colors"
                    name="colors"
                    type="text"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="Black, White, Red"
                    className={inputClass('colors')}
                  />
                </Field>
              </div>
            </section>

            {/* Section 5: Status */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-800">Status & Visibility</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-colors group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-colors">
                      {formData.isActive && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Active</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Product is visible and purchasable on the storefront.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50 cursor-pointer hover:bg-amber-50 hover:border-amber-200 transition-colors group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 flex items-center justify-center transition-colors">
                      {formData.isFeatured && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Featured</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Highlight this product on the homepage or featured sections.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
            >
              Reset form
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
