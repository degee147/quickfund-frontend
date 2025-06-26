'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCard from '@/components/ui/FormCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { APIErrorResponse } from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            await login(data); // delegates to AuthContext
        } catch (error) {
            console.error('Login failed:', error);
            const err = error as APIErrorResponse;
            alert(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <FormCard>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Welcome Back
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
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
