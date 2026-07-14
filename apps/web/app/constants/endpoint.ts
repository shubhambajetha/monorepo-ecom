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
    createcollection: '/admincate/collections',
    getallcollection: '/usercate/collections',
    getcollection: (id: number) => `/usercate/collections/${id}`,
    updatecollection: (id: number) => `/admincate/collections/${id}`,
    deletecollection: (id: number) => `/admincate/collections/${id}`,
  },
  product: {
    createproduct: '/admincate/products',
    getallproducts: '/usercate/products',
    getproduct: (id: number) => `usercate/products/${id}`,
    updateproduct: (id: number) => `admincate/products/${id}`,
    deleteproduct: (id: number) => `admincate/products/${id}`,
  },
  homepage: {
    homecollection: 'homecate/homedata/categories',
    homenewarived: 'homecate/homedata/newarrival',
    homespotlight: 'homecate/homedata/sportlight',
  },
} as const;
