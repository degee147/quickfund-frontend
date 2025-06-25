'use client';

import { useState } from 'react';

export default function ApplyPage() {
    const [form, setForm] = useState({ amount: '', purpose: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Applying for loan:', form);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Apply for a Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="number"
                    name="amount"
                    placeholder="Loan Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="purpose"
                    placeholder="Loan Purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={4}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
}
