import { CategoryPayload } from '@/app/types/category/categorytype';

export const createCategoryFormData = (payload: CategoryPayload): FormData => {
  const formData = new FormData();

  formData.append('name', payload.name);
  formData.append('slug', payload.slug);
  formData.append('image', payload.image);

  return formData;
};
