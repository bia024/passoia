import Header from "./components/Header/Header.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Looks from './pages/Looks.jsx';
import Lancamentos from './pages/Lancamentos.jsx';
import Novidades from './pages/Novidades.jsx';
import Blackfriday from './pages/Blackfriday.jsx';

export default function App() {
  return (
    <> 
      <Header/>
       <h1>Passoia</h1>
      <Routes>
        <Route path="/"
        element="{<Home />}"></Route>
        <Route path="/looks"
        element="{<Looks />}"></Route>
        <Route path="/lancamentos"
        element="{<Lancamentos />}"></Route>
        <Route path="/novidades"
        element="{<Novidades />}"></Route>
        <Route path="/blackfriday"
        element="{<Blackfriday />}"></Route>
      </Routes>
    </>
  );
}

