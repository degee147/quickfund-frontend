'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormCard from '@/components/ui/FormCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const registerSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterForm) => {
        console.log('Registering:', data);
    };

    return (
        <FormCard>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Create Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        placeholder="Full Name"
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                    )}
                </div>
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
                <Button type="submit">Register</Button>
            </form>
            <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 underline">
                    Login
                </a>
            </p>
        </FormCard>
    );
}
