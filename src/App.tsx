import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound } from './pages';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
