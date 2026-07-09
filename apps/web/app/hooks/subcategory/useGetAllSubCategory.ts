import { getallsubcat } from "@/app/services/subcategoryapi/subcategory";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllSubCategory(){
    return useQuery({
        queryKey:["subcategories"],
        queryFn:getallsubcat,
    });
}