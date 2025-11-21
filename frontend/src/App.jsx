import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Looks from "./components/Looks/Looks.jsx";
import Lancamentos from "./components/Lancamentos/Lancamentos.jsx";
import Novidades from "./components/Novidades/Novidades.jsx";
import Blackfriday from "./pages/Blackfriday.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Acessibilidade from "./components/Acessibilidade/Acessibilidade.jsx";
import Login from "./pages/Login/Login.jsx";
import Carrinho from "./pages/Carrinho/Carrinho.jsx";
import Favoritos from "./pages/Favoritos/Favoritos.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key === "L") {
        const texto = document.body.innerText;

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <Acessibilidade />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/novidades" element={<Novidades />} />
        <Route path="/blackfriday" element={<Blackfriday />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/favoritos" element={<Favoritos />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
