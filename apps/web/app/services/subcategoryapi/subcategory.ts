import { subcateCategory, subcategoryPayload } from '@/app/types/subcatgory/subcategorytype';
import { ApiResponse } from '@/app/utils/api';
import { apiClient, normalizeApiError } from '../apiClient';
import { endpoints } from '@/app/constants/endpoint';
import { createSubCategoryFormData, updateSubCategoryFormData } from '@/app/utils/categories/formData';

export const createsubcat = async (
  payload: subcategoryPayload
): Promise<ApiResponse<subcateCategory>> => {
  try {
    const response = await apiClient.post<ApiResponse<subcateCategory>>(
      endpoints.subcategory.createsubcategory,
      createSubCategoryFormData(payload)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getsubcat = async (id: number): Promise<ApiResponse<subcateCategory>> => {
  try {
    const response = await apiClient.get<ApiResponse<subcateCategory>>(
      endpoints.subcategory.getsubcategory(id)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getallsubcat = async (): Promise<ApiResponse<subcateCategory>> => {
  try {
    const response = await apiClient.get<ApiResponse<subcateCategory>>(
      endpoints.subcategory.getallsubcategory
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getupdatesubcat = async (
  id: number,
  payload: subcategoryPayload
): Promise<ApiResponse<subcateCategory>> => {
  try {
    const response = await apiClient.put<ApiResponse<subcateCategory>>(
      endpoints.subcategory.updatesubcategory(id),
      updateSubCategoryFormData(payload)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getdeletesubcat = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      endpoints.subcategory.deletesubcategory(id)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
