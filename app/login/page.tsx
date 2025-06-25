'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCard from '@/components/ui/FormCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        // TODO: POST to Laravel login API, get token
        console.log('Logging in:', data);
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
