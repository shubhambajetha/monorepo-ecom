// Route constants
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ACCOUNT_ORDERS: '/account',
  ACCOUNT_PROFILE: '/account/profile',
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  AUTH_LOGIN: '/auth/signin',
  AUTH_REGISTER: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT: (id: string) => `/products/${id}`,
  CART: '/cart',
  ORDERS: '/orders',
  USER_ORDERS: (userId: string) => `/users/${userId}/orders`,
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
} as const;

// UI constants
export const ITEMS_PER_PAGE = 12;
export const TOAST_DURATION = 3000;

// App config
export const APP_NAME = 'ECommerce';
export const APP_DESCRIPTION = 'Modern E-commerce Store';
