import { ReactNode } from 'react';

export default function FormCard({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            {children}
        </div>
    );
}
