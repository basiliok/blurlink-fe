import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, NotFound, Register } from './pages';
import { AuthGuard, GuestGuard } from './guards';
import { DevTools, ToastContainer } from './components';

export const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <DevTools />
            <Routes>
                <Route element={<GuestGuard />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<AuthGuard />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
