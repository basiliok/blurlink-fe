import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitHubIcon } from '../assets/icons/GitHubIcon';

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) navigate('/home');
    };

    return (
        <div className="text-primary-text flex h-full flex-col justify-between">
            <div className="mt-25 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                    <img src="/peluchin.png" alt="Logo" className="h-16 w-16" />
                    <h1 className="text-size-lg leading-none font-semibold">Sign in</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-size-sm font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-size-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-input-border w-full rounded-md border px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-button-bg hover:bg-button-hover-bg text-size-sm w-full cursor-pointer rounded-md py-2 font-semibold"
                    >
                        Sign in
                    </button>
                </form>
            </div>
            <footer className="text-secondary-text text-size-sm flex justify-center pb-4">
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
