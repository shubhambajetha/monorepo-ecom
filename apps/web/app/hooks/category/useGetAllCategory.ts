import { getAllCategories } from "@/app/services/categoryapi/category";
import { Category } from "@/app/types/category/categorytype";
import { ApiResponse } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";


export default function useGetAllCategory(
  initialData?: ApiResponse<Category[]>
) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    initialData,
  });
}