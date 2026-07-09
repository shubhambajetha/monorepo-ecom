import { CategoryPayload } from '@/app/types/category/categorytype';
import { CollectionPayload } from '@/app/types/collection/collectiontype';
import { ProductPayload } from '@/app/types/product/productype';
import { subcategoryPayload } from '@/app/types/subcatgory/subcategorytype';

const appendTextField = (formData: FormData, key: string, value: unknown): void => {
  if (value === undefined || value === null || value === '') return;
  formData.append(key, typeof value === 'string' ? value : String(value));
};

const appendFileField = (formData: FormData, key: string, file?: File | null): void => {
  if (file instanceof File) {
    formData.append(key, file);
  }
};

export const createCategoryFormData = (payload: CategoryPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendFileField(formData, 'image', payload.image);

  return formData;
};

export const updateCategoryFormData = (payload: CategoryPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendFileField(formData, 'image', payload.image);

  return formData;
};

export const createSubCategoryFormData = (payload: subcategoryPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendTextField(formData, 'categoryId', payload.categoryId);
  appendFileField(formData, 'image', payload.image);

  return formData;
};

export const updateSubCategoryFormData = (payload: subcategoryPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendTextField(formData, 'categoryId', payload.categoryId);
  appendFileField(formData, 'image', payload.image);

  return formData;
};

export const createCollectionFormData = (payload: CollectionPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendTextField(formData, 'subcategoryId', payload.subcategoryId);
  appendFileField(formData, 'bannerImage', payload.bannerImage);

  return formData;
};

export const updateCollectionFormData = (payload: CollectionPayload): FormData => {
  const formData = new FormData();

  appendTextField(formData, 'name', payload.name);
  appendTextField(formData, 'slug', payload.slug);
  appendTextField(formData, 'subcategoryId', payload.subcategoryId);
  appendFileField(formData, 'bannerImage', payload.bannerImage);

  return formData;
};

export const createProductFormData = (payload: ProductPayload): FormData => {
  const formData = new FormData();

  // Text fields
  appendTextField(formData, 'title', payload.title);
  appendTextField(formData, 'slug', payload.slug);
  appendTextField(formData, 'description', payload.description);
  appendTextField(formData, 'brand', payload.brand);
  appendTextField(formData, 'sku', payload.sku);
  appendTextField(formData, 'price', payload.price);
  appendTextField(formData, 'discountPrice', payload.discountPrice);
  appendTextField(formData, 'stock', payload.stock);
  appendTextField(formData, 'collectionId', payload.collectionId);
  appendTextField(formData, 'isFeatured', payload.isFeatured);
  appendTextField(formData, 'isActive', payload.isActive);

  // Thumbnail
  appendFileField(formData, 'thumbnail', payload.thumbnail as File);

  // Images
  payload.images?.forEach((image) => {
    if (image instanceof File) {
      formData.append('images', image);
    }
  });

  // Sizes
  payload.sizes.forEach((size) => {
    formData.append('sizes', size);
  });

  // Colors
  payload.colors.forEach((color) => {
    formData.append('colors', color);
  });

  return formData;
};

export const updateProductFormData = (payload: ProductPayload): FormData => {
  return createProductFormData(payload);
};
