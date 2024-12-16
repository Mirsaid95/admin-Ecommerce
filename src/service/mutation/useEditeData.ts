import { useMutation, useQueryClient } from "@tanstack/react-query"
import { request } from "../../config/request"


interface EditDataParams {
    id: number
    data: FormData
}

export const useEditeData = () => {
    const client = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: EditDataParams) => 
            request.patch(`/category/${id}/`, data).then((res) => res.data),
        
        onSuccess: (_, id ) => {
            client.invalidateQueries({ queryKey: ['useData'] })
            client.invalidateQueries({ queryKey: ['get-sub-category'] })
            client.invalidateQueries({ queryKey: ['single-data', id] })
        },
        
        onError: (error: any) => {
            throw error?.response?.data || 'Error editing category'
        }
    })
}