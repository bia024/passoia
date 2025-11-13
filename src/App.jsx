import Header from "./components/Header/Header.jsx";
import GlobalStyle from './styles/Globalstyle.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Looks from './pages/Looks.jsx';
import Lancamentos from './pages/Lancamentos.jsx';
import Novidades from './pages/Novidades.jsx';
import Blackfriday from './pages/Blackfriday.jsx';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <h1>L'Oréal</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/novidades" element={<Novidades />} />
        <Route path="/blackfriday" element={<Blackfriday />} />
      </Routes>
    </>
  );
}

