import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
            <p className="mb-8 text-xl text-gray-600">Página no encontrada</p>
            <Link to="/" className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600">
                Volver al inicio
            </Link>
        </div>
    );
};
