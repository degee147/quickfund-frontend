'use client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, loading, isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push('/login');
        }
    }, [loading, isLoggedIn, router]);

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    // Don't render layout if not logged in (will redirect)
    if (!isLoggedIn) {
        return null;
    }
    console.log("user id", user.id);
    console.log("user role", user.role);

    return (

        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-6 space-y-4">
                <h2 className="text-2xl font-bold">QuickFund</h2>

                {/* User Info */}
                <div className="border-b border-blue-600 pb-4">
                    <p className="text-sm opacity-75">Welcome,</p>
                    <p className="font-semibold">{user?.name}</p>
                    {/* <p className="font-semibold">{user?.id}</p> */}
                    <p className="text-xs opacity-60 capitalize">{user?.role}</p>
                </div>

                <nav className="flex flex-col space-y-2">
                    {/* Regular User Menu */}
                    <Link href="/dashboard" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/apply" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                        Apply for Loan
                    </Link>
                    <Link href="/dashboard/history" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                        Loan History
                    </Link>
                    {/* <Link href="/dashboard/repay" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                        Repay Loan
                    </Link> */}

                    {/* Admin Menu */}
                    {user?.role === 'admin' && (
                        <>
                            <div className="border-t border-blue-600 pt-4 mt-4">
                                <p className="text-sm font-semibold opacity-75 mb-2">Admin Panel</p>
                            </div>
                            <Link href="/dashboard/admin/loans" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                                All Loans
                            </Link>
                            <Link href="/dashboard/admin/users" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                                Manage Users
                            </Link>
                            <Link href="/dashboard/admin/reports" className="hover:underline hover:bg-blue-700 px-3 py-2 rounded">
                                Reports
                            </Link>
                        </>
                    )}
                </nav>

                {/* Logout Button */}
                {/* <div className="absolute bottom-6">
                    <button
                        onClick={() => {
                            const { logout } = useAuth();
                            logout();
                        }}
                        className="text-red-300 hover:text-red-100 hover:underline"
                    >
                        Logout
                    </button>
                </div> */}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}