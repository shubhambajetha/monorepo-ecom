import { endpoints } from '@/app/constants/endpoint';
import { Category, CategoryPayload } from '@/app/types/category/categorytype';
import { ApiResponse } from '@/app/utils/api';
import { apiClient, normalizeApiError } from '../apiClient';

export const createCategory = async (payload: CategoryPayload): Promise<ApiResponse<Category>> => {
  try {
    const response = await apiClient.post<ApiResponse<Category>>(
      endpoints.category.createcategory,
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Category[]>>(
      endpoints.category.getallcategory
    );
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getCategoryById = async (id: number): Promise<ApiResponse<Category>> => {
  try {
    const response = await apiClient.get<ApiResponse<Category>>(endpoints.category.getcategory(id));
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const updateCategory = async (
  id: number,
  payload: CategoryPayload
): Promise<ApiResponse<Category>> => {
  try {
    const response = await apiClient.put<ApiResponse<Category>>(
      endpoints.category.updatecategory(id),
      payload
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const deletecategory = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      endpoints.category.deletecategory(id)
    );
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
