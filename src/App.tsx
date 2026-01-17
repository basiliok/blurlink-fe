import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound } from './pages';
import { AuthGuard, GuestGuard } from './guards';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<GuestGuard />}>
                    <Route path="/" element={<Login />} />
                </Route>

                <Route element={<AuthGuard />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
