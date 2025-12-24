import axiosClient from "./axiosClient";

export interface OrderBundleProduct {
    product_id: number;
    quantity: number;
}

export interface OrderItemPayload {
    cl_id: number | null;
    school_id: number | null;
    admission_id: string | null;
    student_name: string | null;
    class_id: number | null;
    quantity: number;
    bundle_products: OrderBundleProduct[];
}

export interface OrderProductPayload {
    product_id: number;
    quantity: number;
}

export interface PlaceOrderPayload {
    order_items: OrderItemPayload[];
    products: OrderProductPayload[];
    shipping_address_id: number;
    billing_address_id: number;
    couponcode: string;
    payment_type: string;
}

export const placeOrder = async (data: PlaceOrderPayload) => {
    const response = await axiosClient.post("/Order/PlaceOrder", data);
    return response.data;
};
