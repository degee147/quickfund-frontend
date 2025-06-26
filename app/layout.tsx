'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'Quick Fund',
//   description: 'A Scalable Micro-Lending Platform with Smart Scoring & Payment Integration',
// };



function LayoutHeader() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">QuickFund</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-sm text-gray-700 hover:text-blue-500">Home</Link>
          <Link href="/about" className="text-sm text-gray-700 hover:text-blue-500">About</Link>
          <Link href="/faqs" className="text-sm text-gray-700 hover:text-blue-500">FAQs</Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-blue-500">Dashboard</Link>
              <button onClick={logout} className="text-sm text-gray-700 hover:text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-gray-700 hover:text-blue-500">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>

          <LayoutHeader />

          <main className="flex-1 container mx-auto p-4">{children}</main>

          <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} QuickFund. All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
