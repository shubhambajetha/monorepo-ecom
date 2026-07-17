import { endpoints } from '@/app/constants/endpoint';
import { homecollection, collectionParam, spotlight } from '@/app/types/home/hometype';
import { ApiResponse } from '@/app/utils/api';
import { apiClient } from '../apiClient';

export const getcollectionData = async (
  params: collectionParam
): Promise<ApiResponse<homecollection[]>> => {
  const response = await apiClient.get(endpoints.homepage.homecollection, {
    params,
  });

  return response.data;
};

export const getnewarrival = async (params: collectionParam): Promise<ApiResponse<spotlight[]>> => {
  const response = await apiClient.get(endpoints.homepage.homenewarived, {
    params,
  });
  return response.data;
};

export const getsportlightdata = async (
  params: collectionParam
): Promise<ApiResponse<spotlight[]>> => {
  const response = await apiClient.get(endpoints.homepage.homespotlight, {
    params,
  });
  return response.data;
};
