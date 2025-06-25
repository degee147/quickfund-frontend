import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { fakeAuth } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    if (!fakeAuth.isAuthenticated) {
        redirect('/login');
    }
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-6 space-y-4">
                <h2 className="text-2xl font-bold">QuickFund</h2>
                <nav className="flex flex-col space-y-2">
                    <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link href="/dashboard/apply" className="hover:underline">Apply for Loan</Link>
                    <Link href="/dashboard/history" className="hover:underline">Loan History</Link>
                    <Link href="/dashboard/repay" className="hover:underline">Repay Loan</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
