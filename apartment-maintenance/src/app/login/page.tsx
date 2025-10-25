'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '@/components/ui/floatingInput';
import { toast } from 'sonner';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Login failed');
                return;
            }

            // Save JWT token in localStorage (simplest approach)
            // localStorage.setItem('token', data.token);

            toast.success(`Welcome ${data.user.name}!`);
            window.location.href = "/dashboard";

        } catch (err) {
            toast.error('Something went wrong. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-linear-to-r from-gray-200 to-gray-300 overflow-hidden">
            {/* Background Watermark */}
            {mounted && (
                <div className="absolute mx-5 top-6 text-gray-600 md:text-gray-400 text-5xl md:text-8xl opacity-10 z-0 select-none pointer-events-none">
                    N E X S P I R E
                </div>
            )}

            <div className="relative z-10 w-full md:max-w-md max-w-xs bg-gray-100 shadow-xl border border-gray-300 rounded-xl p-8 flex flex-col items-center">
                {/* Product Name */}
                <div className="text-gray-600 md:text-gray-400 text-3xl md:text-4xl opacity-45 mb-4 select-none pointer-events-none">
                    SOCIETY 365
                </div>

                {/* Login Heading */}
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">LOGIN</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-3">
                    <FloatingInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-gray-300 mb-1"
                    />
                    <FloatingInput
                        id="password"
                        label="Password"
                        type="password"
                        showPasswordToggle
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300"
                    />
                    <Button type="submit" className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-md">
                        Login
                    </Button>

                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-500">
                            Haven&apos;t onboarded yet?{" "}
                            <button
                                type='button'
                                onClick={() => router.push("/onboarding")}
                                className="hover:underline ml-0.5 text-foreground cursor-pointer"
                                aria-label="Go to Resident Onboarding page"
                            >
                                Resident Onboarding
                            </button>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
