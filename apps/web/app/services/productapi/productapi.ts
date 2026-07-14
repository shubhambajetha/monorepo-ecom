import {
  PaginatedResponse,
  Product,
  ProductPayload,
  ProductQueryParams,
} from '@/app/types/product/productype';
import { ApiResponse } from '@/app/utils/api';
import { apiClient, normalizeApiError } from '../apiClient';
import { endpoints } from '@/app/constants/endpoint';
import { createProductFormData } from '@/app/utils/categories/formData';

export const createproduct = async (payload: ProductPayload): Promise<ApiResponse<Product>> => {
  try {
    const response = await apiClient.post<ApiResponse<Product>>(
      endpoints.product.createproduct,
      createProductFormData(payload)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getproduct = async (id: number): Promise<ApiResponse<Product>> => {
  try {
    const response = await apiClient.get<ApiResponse<Product>>(
      endpoints.product.getproduct(id)
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getallproduct = async (
  params?: ProductQueryParams
): Promise<PaginatedResponse<Product>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      endpoints.product.getallproducts,
      {
        params,
      }
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const updateProduct = async (
  id: number,
  payload: ProductPayload
): Promise<ApiResponse<Product>> => {
  try {
    const response = await apiClient.put<ApiResponse<Product>>(
      endpoints.product.updateproduct(id),
      payload
    );
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const deleteproduct = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(endpoints.product.deleteproduct(id));
    return response?.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
