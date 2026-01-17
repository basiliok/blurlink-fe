import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { login } from '../services/auth';

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token.token);
            navigate('/home');
        },
    });
};
