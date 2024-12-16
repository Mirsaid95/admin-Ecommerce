import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { AttributeData } from "../../types/dataTypes";


export const useCreateAttribute = () => {
    return useMutation({
        mutationFn: (data: AttributeData) => request.post("/attribute/",data).then((res) => res.data)
    })
}