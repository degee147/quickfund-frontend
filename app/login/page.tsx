'use client';

import { useState } from 'react';
import FormCard from '@/components/ui/FormCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: POST to Laravel login API, get token
        console.log('Logging in:', form);
    };

    return (
        <FormCard>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Welcome Back
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Login</Button>
            </form>
            <p className="text-center text-sm mt-4">
                New user?{' '}
                <a href="/register" className="text-blue-600 underline">
                    Create an account
                </a>
            </p>
        </FormCard>
    );
}
