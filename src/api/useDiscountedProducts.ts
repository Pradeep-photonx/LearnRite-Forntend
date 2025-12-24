import { useState, useEffect } from 'react';
import { getProductPublicDiscountedList } from './product';
import type { PublicProduct } from './product';

export const useDiscountedProducts = () => {
    const [products, setProducts] = useState<PublicProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDiscountedProducts = async () => {
        try {
            setLoading(true);
            const data = await getProductPublicDiscountedList();
            setProducts(data.rows);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching discounted products:', err);
            setError(err.message || 'Failed to fetch products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscountedProducts();
    }, []);

    return { products, loading, error, refetch: fetchDiscountedProducts };
};
