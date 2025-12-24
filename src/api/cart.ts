import axiosClient from "./axiosClient";

// Product interface for cart items
export interface CartProduct {
    product_id: number;
    category_id: number;
    sub_category_id: number;
    brand_id: number;
    name: string;
    description: string;
    image: string;
    image1: string;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    image5: string | null;
    mrp: number;
    selling_price: number;
    discount_percentage: number;
    sku: string;
    stock_quantity: number;
    is_active: boolean;
    is_delete: boolean;
}

// Class Language interface
export interface ClassLanguage {
    cl_id: number;
    class_id: number | null;
    language: string;
    is_active: boolean;
    is_delete: boolean;
    Class: {
        name: string;
    } | null;
}

// Cart Item Bundle (for bundle products)
export interface CartItemBundle {
    cart_item_bundle_id: number;
    cart_item_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    Product: {
        name: string;
        selling_price: number;
    };
}

// Cart Item interface
export interface CartItem {
    cart_item_id: number;
    cart_id: number;
    cl_id: number | null;
    product_id: number | null;
    quantity: number;
    unit_price: number;
    total_price: number;
    admission_id: string | null;
    student_name: string | null;
    class_id: number | null;
    student_class: string | null;
    student_section: string | null;
    bundle_name: string | null;
    createdAt: string;
    updatedAt: string;
    ClassLanguage: ClassLanguage | null;
    Class: {
        class_id: number;
        name: string;
        image: string;
        description: string;
    } | null;
    Product: CartProduct | null;
    CartItemBundles: CartItemBundle[];
}

// User Cart interface
export interface UserCart {
    cart_id: number;
    user_id: number;
    price: number;
    CartItems: CartItem[];
}

// Cart Details Response
export interface CartDetailsResponse {
    user_cart: UserCart[];
}

// Get cart details
export const getCartDetails = async () => {
    const response = await axiosClient.get<CartDetailsResponse>("/Cart/details");
    return response.data;
};

// Update cart item quantity
export interface UpdateCartItemPayload {
    cart_item_id: number;
    quantity: number;
}

export const updateCartItemQuantity = async (data: UpdateCartItemPayload) => {
    const response = await axiosClient.put("/Cart/update-quantity", data);
    return response.data;
};

// Add item to cart
export interface AddToCartPayload {
    cl_id: number | null;
    admission_id: string | null;
    student_name: string | null;
    class_id: number | null;
    bundle_products: {
        product_id: number;
        quantity: number;
    }[];
    products: {
        product_id: number;
        quantity: number;
    }[];
}

export const addToCart = async (data: AddToCartPayload) => {
    const response = await axiosClient.post("/Cart/AddToCart", data);
    return response.data;
};

// Remove cart item
export const removeCartItem = async (cartItemId: number) => {
    const response = await axiosClient.delete(`/Cart/item/delete/${cartItemId}`);
    return response.data;
};
