import Header from "./components/Header/Header.jsx";
// import GlobalStyle from './styles/Globalstyle.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Looks from './components/Looks/Looks.jsx';
import Lancamentos from './components/Lancamentos/Lancamentos.jsx';
import Novidades from './components/Novidades/Novidades.jsx';
import Blackfriday from './pages/Blackfriday.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looks" element={<Looks />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/novidades" element={<Novidades />} />
        <Route path="/blackfriday" element={<Blackfriday />} />
      </Routes>
      <Footer />
    </>
  );
}

