import { useState, useEffect } from 'react';
import { getSchoolClasses } from './bundle';

export interface BundleProduct {
    class_bundle_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    is_mandatory: boolean;
    selling_price: number;
    mrp: number;
    sku: string;
    description: string;
    image: string[];
    total_selling_price: number;
}

export interface ClassBundle {
    cl_id: number;
    language: string;
    bundle_id: string;
    total_products?: number;
    total_price: number;
    products?: BundleProduct[];
}

export interface SchoolClass {
    class_id: number;
    class_name: string;
    class_image: string;
    bundles: ClassBundle[];
}

export type SchoolClassesResponse = SchoolClass[];

export const useSchoolClasses = (schoolId: number | null) => {
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClasses = async () => {
        if (!schoolId) return;
        try {
            setLoading(true);
            const data: SchoolClassesResponse = await getSchoolClasses(schoolId);
            setClasses(data || []);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching classes:', err);
            setError(err.message || 'Failed to fetch classes');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (schoolId) {
            fetchClasses();
        }
    }, [schoolId]);

    return { classes, loading, error, refetch: fetchClasses };
};
