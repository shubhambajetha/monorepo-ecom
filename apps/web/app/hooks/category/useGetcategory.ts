import { getCategoryById } from "@/app/services/categoryapi/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetcategory(id?: string | number) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => (id ? getCategoryById(id) : Promise.reject('No ID provided')),
    enabled: !!id,
  });
}

