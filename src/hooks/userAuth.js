"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(requiredRole = null) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`);
            const data = await res.json();

           //  console.log("data ",data.user)

            if (res.status !== 200) {
                router.push('/SignIn');
            } else if (requiredRole && data.user?.role !== requiredRole) {
                router.push('/not-authorized');
            } else {
                setUser(data.user);
            }
            setLoading(false);
        }

        checkAuth();
    }, [requiredRole]);

    return { user, loading };
}
