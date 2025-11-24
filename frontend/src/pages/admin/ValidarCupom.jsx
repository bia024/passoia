import { useState } from "react";
import "./ValidarCupom.scss";

export default function ValidarCupom({ onLogout }) {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidar = async (e) => {
    e.preventDefault();
    if (!codigo) return;

    setIsLoading(true);
    setResultado(null);

    try {
      const response = await fetch(
        `http://localhost:3000/cupons/validar/${codigo}`
      );
      const data = await response.json();

      if (!response.ok) {
        setResultado({
          sucesso: false,
          mensagem: data.message || "Erro na validação.",
        });
      } else {
        setResultado({ sucesso: true, mensagem: data.message });
      }
    } catch (error) {
      setResultado({
        sucesso: false,
        mensagem: "Erro de conexão. Verifique o servidor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="validar-cupom-container">
      <div className="validar-cupom-box">
        <div className="header">
          <h2>Validador de Cupons</h2>
          <button onClick={onLogout} className="logout-btn">
            Sair
          </button>
        </div>
        <p>
          Digite o código do cupom apresentado pelo cliente para verificar a
          validade.
        </p>
        <form onSubmit={handleValidar}>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="PASS-XXXXXX"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Validando..." : "Validar Cupom"}
          </button>
        </form>

        {resultado && (
          <div
            className={`resultado-box ${
              resultado.sucesso ? "sucesso" : "erro"
            }`}
          >
            <h3>Resultado:</h3>
            <p>{resultado.mensagem}</p>
          </div>
        )}
      </div>
    </div>
  );
}
