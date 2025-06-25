import { InputHTMLAttributes } from 'react';

export default function Input({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 ${className}`}
        />
    );
}
