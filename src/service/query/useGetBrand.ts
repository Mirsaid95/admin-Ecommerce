import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";


export const useGetBrand = () => {
    return useQuery({
        queryKey: ["useBrand"],
        queryFn: () => request.get("/brand/").then((res) => res.data)
    })
}