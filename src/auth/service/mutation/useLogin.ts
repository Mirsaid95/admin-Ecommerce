import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";

export interface LoginPayload {
    phoneNumber: string,
    password: string
}

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginPayload) => request.post("/api/admin-login/", {
            phone_number: data.phoneNumber,
            password: data.password
        }).then((res) => res.data)
    })
}