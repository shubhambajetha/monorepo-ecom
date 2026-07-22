import { endpoints } from '@/app/constants/endpoint';
import { Collection, CollectionPayload } from '@/app/types/collection/collectiontype';
import { ApiResponse } from '@/app/utils/api';
import {
  createCollectionFormData,
  updateCollectionFormData,
} from '@/app/utils/categories/formData';
import { apiClient, normalizeApiError } from '../apiClient';
import { Product } from '@/app/types/product/productype';

export const createCollection = async (
  payload: CollectionPayload
): Promise<ApiResponse<Collection>> => {
  try {
    const response = await apiClient.post<ApiResponse<Collection>>(
      endpoints.collection.createcollection,
      createCollectionFormData(payload)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getAllCollections = async (): Promise<ApiResponse<Collection[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Collection[]>>(
      endpoints.collection.getallcollection
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getCollectionById = async (id: number): Promise<ApiResponse<Collection>> => {
  try {
    const response = await apiClient.get<ApiResponse<Collection>>(
      endpoints.collection.getcollection(id)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const getProductsByCollection = async (
  category: string,
  collection: string
): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      endpoints.collection.getProductsByCollection,
      {
        params: {
          category,
          collection,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const updateCollection = async (
  id: number,
  payload: CollectionPayload
): Promise<ApiResponse<Collection>> => {
  try {
    const response = await apiClient.put<ApiResponse<Collection>>(
      endpoints.collection.updatecollection(id),
      updateCollectionFormData(payload)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const deleteCollection = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      endpoints.collection.deletecollection(id)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
