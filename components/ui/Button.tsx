import { ButtonHTMLAttributes } from 'react';

export default function Button({
    className = '',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 ${className}`}
        />
    );
}
