import { getCategoryById } from "@/app/services/categoryapi/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetcategory(id:number){
    return useQuery({
        queryKey:["getcat",id],
        queryFn:()=>getCategoryById(id),
        enabled :!!id
    });
}

