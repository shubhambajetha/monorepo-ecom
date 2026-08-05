import { ApiResponse } from '@/app/utils/api';
import { apiClient, normalizeApiError } from '../apiClient';
import { endpoints } from '@/app/constants/endpoint';

export interface WishlistPayload {
  productId: string;
}

export interface WishlistProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  thumbnail: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  isSpotlight: boolean;
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: WishlistProduct;
}

/**
 * Add Product to Wishlist
 */
export const createWishlist = async (
  payload: string | WishlistPayload
): Promise<ApiResponse<WishlistItem>> => {
  try {
    const productId = typeof payload === 'string' ? payload : payload.productId;
    const response = await apiClient.post<ApiResponse<WishlistItem>>(
      endpoints.wishlists.create(productId)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Get Wishlist
 */
export const getWishlist = async (): Promise<ApiResponse<WishlistItem[]>> => {
  try {
    const response = await apiClient.get<ApiResponse<WishlistItem[]>>(
      endpoints.wishlists.get
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

/**
 * Remove Product from Wishlist
 */
export const deleteWishlist = async (
  productId: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      endpoints.wishlists.delete(productId)
    );

    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};