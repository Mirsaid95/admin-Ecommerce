import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";


export const useGetProduct = () => {
    return useQuery({
        queryKey: ["useProduct"],
        queryFn: () => request.get("/product/").then((res) => res.data)
    })
}   