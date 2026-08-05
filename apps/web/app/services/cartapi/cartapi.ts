import { ApiResponse } from '@/app/utils/api';
import { apiClient, normalizeApiError } from '../apiClient';
import { endpoints } from '@/app/constants/endpoint';

export interface CartPayload {
  productId: string;
  quantity?: number;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClearCartResponse {
  success: boolean;
  message: string;
  deletedItems: number;
}

/**
 * Add Item to Cart
 */
export const createCart = async (payload: CartPayload): Promise<ApiResponse<CartItem>> => {
  try {
    const response = await apiClient.post<ApiResponse<CartItem>>(
      endpoints.carts.createcart(payload.productId),
      payload.quantity !== undefined ? { quantity: payload.quantity } : undefined
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Get Cart
 */
export const getCart = async (): Promise<ApiResponse<CartItem[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<CartItem[]>>(endpoints.carts.getcart);

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Count Cart Items
 */
export const countCart = async (): Promise<ApiResponse<number>> => {
  try {
    const response = await apiClient.get<ApiResponse<number>>(endpoints.carts.countcart);

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Delete Single Cart Item
 */
export const deleteCartItem = async (productId: string): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(endpoints.carts.deletecart(productId));

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Clear Cart
 */
export const clearCart = async (): Promise<ClearCartResponse> => {
  try {
    const response = await apiClient.delete<ClearCartResponse>(endpoints.carts.clearcart);

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
