import GetAllSubcat from "@/app/components/admin/subcategory/GetAllSubcat";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllSubCategory(){
    return useQuery({
        queryKey:["usegetallsubcate"],
        queryFn:GetAllSubcat,
    });
}