export const endpoints = {
  auth: {
    signup: '/auth/signup',
    signin: '/auth/signin',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  category: {
    createcategory: '/admincate/categories',
    getcategory: (id: number) => `/usercate/categories/${id}`,
    getallcategory: '/usercate/categories/',
    updatecategory: (id: number) => `/admincate/categories/${id}`,
    deletecategory: (id: number) => `/admincate/categories/${id}`,
  },
} as const;
