import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        // Mostra uma tela de loading enquanto a requisição para /me está em andamento
        return <div>Carregando...</div>; 
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;