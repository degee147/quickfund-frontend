'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardHome() {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.replace('/login')
        }
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>
            <p className="text-gray-600">
                Here you can manage your loan applications, repayments, and view history.
            </p>
        </div>
    );
}
