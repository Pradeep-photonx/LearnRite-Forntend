import { useState, useEffect } from 'react';
import { getSchoolList } from './school';
import type { School } from './school';

export const useSchools = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchools = async () => {
        try {
            setLoading(true);
            const data = await getSchoolList();
            setSchools(data.rows);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching schools:', err);
            setError(err.message || 'Failed to fetch schools');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    return { schools, loading, error, refetch: fetchSchools };
};
