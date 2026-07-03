import { getAllCategories } from "@/app/services/categoryapi/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCategory(){
    return useQuery({
        queryKey:["getallcat"],
        queryFn:getAllCategories
    })
}

