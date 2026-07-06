import { getAllCollections } from "@/app/services/collectionapi/collectionapi";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getAllCollections,
  });
}