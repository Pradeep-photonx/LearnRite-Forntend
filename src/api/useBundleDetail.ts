import { useState, useEffect } from 'react';
import { getBundleDetail } from './bundle';
import type { BundleDetailResponse } from './bundle';

export const useBundleDetail = (bundleId: string | null) => {
    const [bundle, setBundle] = useState<BundleDetailResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBundle = async () => {
        if (!bundleId) return;
        try {
            setLoading(true);
            const data = await getBundleDetail(bundleId);
            setBundle(data);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching bundle detail:', err);
            setError(err.message || 'Failed to fetch bundle details');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bundleId) {
            fetchBundle();
        }
    }, [bundleId]);

    return { bundle, loading, error, refetch: fetchBundle };
};
