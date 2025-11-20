import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx"; // 1. Importar o hook de autenticação

export default function ProtectedRoute() {
  // estado de autenticação real do AuthContext
  const { isAuthenticated } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para a página de login.
  // O 'replace' impede que o usuário volte para a página protegida com o botão "Voltar" do navegador.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a página que está sendo protegida (ex: /favoritos).
  return <Outlet />;
}
