import axiosClient from "./axiosClient";

export interface BundleProduct {
    product_id: number;
    quantity: number;
    is_mandatory: number; // 0 or 1
}

export interface CreateBundlePayload {
    class_id: number;
    cl_id: number;
    school_id: number;
    name: string;
    products: BundleProduct[];
}

export interface Bundle {
    bundle_id: string;
    name: string;
    class_id: number;
    cl_id: number;
    school_id: number;
    is_active: boolean;
    total_products: number;
    total_bundle_price: number;
    createdAt: string;
    Class: {
        name: string;
    };
    ClassLanguage: {
        language: string;
    };
    School: {
        name: string;
    };
}

export interface BundleListResponse {
    count: number;
    rows: Bundle[];
}

export interface BundleProductResponse {
    class_bundle_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    total_price: number;
    is_mandatory: boolean;
    product_details: {
        product_id: number;
        name: string;
        selling_price: number;
        mrp: number;
        image: string;
    };
}

export interface BundleDetailResponse {
    bundle_id: string;
    name: string;
    class_id: number;
    cl_id: number;
    school_id: number;
    is_active: boolean; // Kept as it might be useful, though not in snippet
    total_bundle_cost: number;
    total_products: number;
    products: BundleProductResponse[];
    school: {
        school_id: number;
        name: string;
        image: string;
        address: string;
        branch: string;
        board: string;
        shipping_fee: boolean;
    };
    class: {
        class_id: number;
        name: string;
        image: string;
    };
    language: {
        cl_id: number;
        language: string;
    };
}

export interface UpdateBundlePayload {
    new_school_id: number;
    name: string;
    products: BundleProduct[];
}

export const createBundle = async (data: CreateBundlePayload) => {
    const response = await axiosClient.post("ClassBundle/create", data);
    return response.data;
};

export const updateBundle = async (bundleId: string, data: UpdateBundlePayload) => {
    const response = await axiosClient.put(`ClassBundle/update/${bundleId}`, data);
    return response.data;
};

export const getBundleList = async () => {
    const response = await axiosClient.get<BundleListResponse>("ClassBundle/list");
    return response.data;
};

export const getBundleDetail = async (bundleId: string) => {
    const response = await axiosClient.get<BundleDetailResponse>(`ClassBundle/view/${bundleId}`);
    return response.data;
};

export const deleteBundle = async (bundleId: string) => {
    const response = await axiosClient.delete(`ClassBundle/delete/${bundleId}`);
    return response.data;
};

export const getSchoolClasses = async (schoolId: number) => {
    const response = await axiosClient.get(`ClassBundle/school/${schoolId}/classes-list`);
    return response.data;
};

export interface VerificationResponse {
    success: boolean;
    message: string;
    admission: {
        id: number;
        school_id: number;
        admission_id: string;
        school_no: string | null;
        student_name: string;
        class: string;
        parent_name: string;
        parent_mobile_number: string;
        new_admission: boolean;
        is_active: boolean;
        createdAt: string;
        updatedAt: string;
        class_id: number;
    };
}

export const verifyAdmission = async (bundleId: string, admissionId: string) => {
    const response = await axiosClient.get<VerificationResponse>(`Admission/verify/${bundleId}/${admissionId}`);
    return response.data;
};

export interface CreateStudentPayload {
    admission_id: string;
    student_name: string;
    class_id: number;
    parent_name: string;
    parent_mobile_number: string;
    new_admission: boolean;
}

export interface CreateStudentResponse {
    success: boolean;
    message: string;
    student_id?: number;
}

export const createStudent = async (schoolId: number, data: CreateStudentPayload) => {
    const response = await axiosClient.post<CreateStudentResponse>(`Admission/student/create/${schoolId}`, data);
    return response.data;
};

export interface AddToCartPayload {
    cl_id: number;
    admission_id: string;
    student_name: string;
    class_id: number;
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
