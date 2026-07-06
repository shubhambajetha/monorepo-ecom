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
  collection: {
    createcollection: '/collections',
    getallcollection: '/collections',
    getcollection: (id: number) => `/collections/${id}`,
    updatecollection: (id: number) => `/collections/${id}`,
    deletecollection: (id: number) => `/collections/${id}`,
  },
  product: {
    createproduct: '/products',
    getallproducts: '/products',
    getproduct: (id: number) => `/products/${id}`,
    updateproduct: (id: number) => `/products/${id}`,
    deleteproduct: (id: number) => `/products/${id}`,
  },
} as const;
