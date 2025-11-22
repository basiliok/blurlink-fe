import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) navigate('/home');
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="w-80 space-y-4 rounded bg-[#a7a7a72c] p-6 shadow">
                <h2 className="text-center text-xl font-bold">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded border px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded border px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
};
