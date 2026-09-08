import { getAllCollections } from "@/app/services/collectionapi/collectionapi";
import { Collection } from "@/app/types/collection/collectiontype";
import { ApiResponse } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCollections(initialData?:ApiResponse<Collection[]>) {
  
  return useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
    initialData
  });
}