import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";


export const useGetAttribute = () => {
    return useQuery({
        queryKey: ["useAttribute"],
        queryFn: () => request.get("/attribute/").then((res) => res.data)
    })
}