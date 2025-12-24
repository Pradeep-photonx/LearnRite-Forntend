import { useState, useEffect } from 'react';
import { getProductPublicList } from './product';
import type { PublicProduct } from './product';

export const usePublicProducts = () => {
    const [products, setProducts] = useState<PublicProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProductPublicList();
            setProducts(data.rows);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching public products:', err);
            setError(err.message || 'Failed to fetch products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, refetch: fetchProducts };
};
