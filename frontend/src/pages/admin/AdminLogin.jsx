import { useState } from "react";
import "./ValidarCupom.scss";

export default function AdminLogin({ onLoginSuccess }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErro("");

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });

      if (response.ok) {
        onLoginSuccess();
      } else {
        const data = await response.json();
        setErro(data.error || "Senha incorreta. Tente novamente.");
        setSenha("");
      }
    } catch (error) {
      setErro("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="validar-cupom-container">
      <div className="validar-cupom-box">
        <h2>Acesso Restrito</h2>
        <p>Esta página é para uso exclusivo dos funcionários.</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha de acesso"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {erro && <p className="login-error">{erro}</p>}
      </div>
    </div>
  );
}
