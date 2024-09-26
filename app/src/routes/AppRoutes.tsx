import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NovoEnsaio from '../pages/Ensaio/NovoEnsaio';
import MinhasMusicas from '../pages/Musicas/MinhasMusicas';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo-ensaio" element={<NovoEnsaio />} />
        <Route path="/minhas-musicas" element={<MinhasMusicas />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;