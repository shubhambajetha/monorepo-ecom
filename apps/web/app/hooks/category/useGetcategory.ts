import { getCategoryById } from "@/app/services/categoryapi/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetcategory(id:number){
    return useQuery({
        queryKey:["categories",id],
        queryFn:()=>getCategoryById(id),
        enabled :!!id
    });
}

