'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import API from '@/lib/axios';
import { APIErrorResponse } from '@/lib/axios';



export default function ApplyPage() {
    const [form, setForm] = useState({ amount: '', purpose: '', duration: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('You must be logged in to apply for a loan.');
            router.push('/login');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                amount: Number(form.amount),
                reason: form.purpose,
                duration: Number(form.duration),
            };

            await API.post('/loans', payload);

            alert('Loan application submitted successfully!');
            router.push('/dashboard/history'); // or a loan summary page
        } catch (error) {
            console.error('Loan application failed:', error);
            const err = error as APIErrorResponse;
            alert(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
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
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (days)"
                    value={form.duration}
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
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
}
