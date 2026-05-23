import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitHubIcon } from '../assets/icons/GitHubIcon';
import { useLogin } from '../api';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { mutate: login, isPending, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login({ email, password });
        }
    };

    return (
        <div className="text-primary-text flex h-full flex-col justify-between">
            <div className="mt-25 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                    <img src="/peluchin.png" alt="Logo" className="h-16 w-16" />
                    <h1 className="text-size-5 leading-none font-semibold">Sign in</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-size-2 font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-size-2 font-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-size-2 text-red-500">
                            {error instanceof Error ? error.message : 'Sign in failed'}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-button-bg hover:bg-button-hover-bg text-size-2 w-full cursor-pointer rounded-md py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? 'Signing in...' : 'Sign in'}
                    </button>

                    <p className="text-secondary-text text-size-2 text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-text hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
            <footer className="text-secondary-text text-size-2 flex justify-center pb-4">
                <div className="hover:text-primary-text flex cursor-pointer flex-row items-center justify-center gap-1 transition-colors">
                    <GitHubIcon size={24} />
                    <a href="https://github.com/basiliok" target="_blank" rel="noopener noreferrer">
                        basiliok
                    </a>
                </div>
            </footer>
        </div>
    );
};
