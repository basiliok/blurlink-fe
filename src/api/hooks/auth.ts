import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { useUserStore } from '../../stores/user.store';
import { login } from '../services/auth';
import { decodeJwt } from '../../utils/jwt';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (result) => {
            setAuth(result.token);
            const { userId, email } = decodeJwt(result.token);
            setUser(userId, email);
            navigate('/home');
        },
    });
};
