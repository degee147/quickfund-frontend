import Link from 'next/link';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { fakeAuth } from '@/lib/auth';


export default function AdminLayout({ children }: { children: ReactNode }) {
    if (!fakeAuth.isAuthenticated) {
        redirect('/login');
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
                <h2 className="text-2xl font-bold">Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <Link href="/admin" className="hover:underline">Dashboard</Link>
                    <Link href="/admin/applications" className="hover:underline">Applications</Link>
                    <Link href="/admin/repayments" className="hover:underline">Repayments</Link>
                    <Link href="/admin/export" className="hover:underline">Export</Link>
                </nav>
            </aside>

            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
