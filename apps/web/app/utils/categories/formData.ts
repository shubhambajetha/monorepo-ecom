import { CategoryPayload } from '@/app/types/category/categorytype';
import { CollectionPayload } from '@/app/types/collection/collectiontype';
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
