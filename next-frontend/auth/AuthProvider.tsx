'use client'
import React, { useEffect, useState } from 'react';
import getCookie from '@/utils/getCookie';
import { useRouter } from 'next/navigation';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        try {
            const authCookie = getCookie('auth');
            console.log(authCookie) 
            if (authCookie) {
                setIsAuthenticated(true);
            } else {
                router.push('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    }, [router]);

    if (!isAuthenticated) {
        return <div>Loading...</div>; 
    }

    return <>{children}</>;
};

export default AuthProvider;
