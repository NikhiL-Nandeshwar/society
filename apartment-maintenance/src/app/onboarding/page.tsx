'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floatingInput';
import { toast } from 'sonner';

const Onboarding = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [wing, setWing] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mounted, setMounted] = useState(false);

    const router = useRouter();

    useEffect(() => setMounted(true), []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !mobile || !wing || !flatNumber || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/auth/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, mobile, wing, flatNumber, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Onboarding failed');
                return;
            }

            toast.success('Resident onboarded successfully! You can login now.');
            router.push('/login');
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-linear-to-r from-gray-200 to-gray-300 overflow-hidden">
            {mounted && (
                <div className="absolute mx-5 top-6 text-gray-600 md:text-gray-400 text-5xl md:text-8xl opacity-10 z-0 select-none pointer-events-none">
                    N E X S P I R E
                </div>
            )}

            <div className="relative z-10 w-full md:max-w-lg max-w-sm bg-gray-100 shadow-xl border border-gray-300 rounded-xl p-8 flex flex-col items-center mt-24">
                <div className="text-gray-600 md:text-gray-400 text-3xl md:text-4xl opacity-45 mb-3 select-none pointer-events-none">
                    SOCIETY 365
                </div>
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Resident Onboarding</h2>
                <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="self-start mb-4 text-blue-600 hover:underline"
                >
                    &larr; Back to Login
                </button>
                <form onSubmit={handleSubmit} className="w-full space-y-3.5">
                    <FloatingInput
                        id="name"
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />
                    <FloatingInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />
                    <FloatingInput
                        id="mobile"
                        label="Mobile Number"
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />
                    <div className="flex space-x-3">
                        <FloatingInput
                            id="wing"
                            label="Wing"
                            type="text"
                            value={wing}
                            onChange={(e) => setWing(e.target.value)}
                            className="w-full rounded-md border border-gray-300"
                        />
                        <FloatingInput
                            id="flatNumber"
                            label="Flat Number"
                            type="text"
                            value={flatNumber}
                            onChange={(e) => setFlatNumber(e.target.value)}
                            className="w-full rounded-md border border-gray-300"
                        />
                    </div>
                    <FloatingInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        showPasswordToggle
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />
                    <FloatingInput
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        showPasswordToggle
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-md"
                    >
                        Complete Onboarding
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
