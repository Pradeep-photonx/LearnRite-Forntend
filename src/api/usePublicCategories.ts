import { useState, useEffect } from 'react';
import { getPublicCategoryList } from './category';
import type { PublicCategory } from './category';

export const usePublicCategories = () => {
    const [categories, setCategories] = useState<PublicCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getPublicCategoryList();
            setCategories(data);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching public categories:', err);
            setError(err.message || 'Failed to fetch categories');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refetch: fetchCategories };
};
