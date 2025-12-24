import axiosClient from "./axiosClient";

export interface CreateAddressPayload {
    first_name: string;
    address1: string;
    phone: string;
    alternate_phone: string;
    pincode: number;
    country: string;
    state_id: string;
    city: string;
}

export const createAddress = async (data: CreateAddressPayload) => {
    const response = await axiosClient.post("/Address/create", data);
    return response.data;
};

export const getAddressList = async () => {
    const response = await axiosClient.get("/Address/list");
    return response.data;
};

export const deleteAddress = async (addressId: number) => {
    const response = await axiosClient.delete(`/Address/delete/${addressId}`);
    return response.data;
};

export const updateAddress = async (addressId: number, data: Partial<CreateAddressPayload>) => {
    const response = await axiosClient.put(`/Address/update/${addressId}`, data);
    return response.data;
};
