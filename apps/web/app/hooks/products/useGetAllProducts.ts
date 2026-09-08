import { getallproduct } from '@/app/services/productapi/productapi';
import { PaginatedResponse, Product, ProductQueryParams } from '@/app/types/product/productype';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllProducts(
  params?: ProductQueryParams,
  initialData?: PaginatedResponse<Product>
) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getallproduct(params),
    initialData,
  });
}
