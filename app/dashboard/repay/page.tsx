'use client';

import { useState } from 'react';

export default function RepayPage() {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Repaying:', amount);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Repay Loan</h2>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <input
                    type="number"
                    placeholder="Amount to repay"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Pay Now (Mock)
                </button>
            </form>
        </div>
    );
}
