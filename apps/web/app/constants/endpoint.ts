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
  subcategory: {
    createsubcategory: '/admincate/subcategories',
    getsubcategory: (id: number) => `/usercate/subcategories/${id}`,
    getallsubcategory: '/usercate/subcategories/',
    updatesubcategory: (id: number) => `/admincate/subcategories/${id}`,
    deletesubcategory: (id: number) => `/admincate/subcategories/${id}`,
  },
} as const;
