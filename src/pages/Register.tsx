import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../api';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { mutate: register, isPending, error } = useRegister();

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = 'Password must contain letters and numbers';
        }

        if (!inviteCode.trim()) {
            newErrors.inviteCode = 'Invite code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            register({ email, password, inviteCode });
        }
    };

    return (
        <div className="text-primary-text flex h-full flex-col justify-between">
            <div className="mt-25 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                    <img src="/peluchin.png" alt="Logo" className="h-16 w-16" />
                    <h1 className="text-size-5 leading-none font-semibold">Sign up</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-size-2 font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-size-2 text-red-500">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-size-2 font-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-size-2 text-red-500">{errors.password}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="inviteCode" className="text-size-2 font-semibold">
                            Invite code
                        </label>
                        <input
                            id="inviteCode"
                            type="text"
                            placeholder="Invite code"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                        />
                        {errors.inviteCode && <p className="text-size-2 text-red-500">{errors.inviteCode}</p>}
                    </div>

                    {error && (
                        <p className="text-size-2 text-red-500">
                            {error instanceof Error ? error.message : 'Sign up failed'}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-button-bg hover:bg-button-hover-bg text-size-2 w-full cursor-pointer rounded-md py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? 'Creating account...' : 'Sign up'}
                    </button>

                    <p className="text-secondary-text text-size-2 text-center">
                        Already have an account?{' '}
                        <Link to="/" className="text-primary-text hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
            <footer className="flex flex-col items-center gap-3 pb-4">
                <p className="text-secondary-text text-size-2 max-w-80 text-center">
                    This project is still under development. If you're interested in trying it out, drop me a line at{' '}
                    <span className="text-primary-text">paledot01@gmail.com</span> and I'll send you an invite code to
                    explore what's built so far.
                </p>
            </footer>
        </div>
    );
};
