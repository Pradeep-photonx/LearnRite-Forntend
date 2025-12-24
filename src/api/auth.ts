import axiosClient from "./axiosClient";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UserRegisterPayload {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    alternate_phone?: string;
    password: string;
}

export const login = async (data: LoginPayload) => {
    const response = await axiosClient.post("/User/login", data);
    return response.data;
};

export const registerUser = async (data: UserRegisterPayload) => {
    const response = await axiosClient.post("/User/register", data);
    return response.data;
};
