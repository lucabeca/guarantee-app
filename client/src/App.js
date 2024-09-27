import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuestaoPage from './components/QuestaoPage';
import About from './pages/About';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100"> {/* Adicionando classes para altura total da tela */}
      <NavBar />
      <main className="flex-grow-1"> {/* flex-grow-1 permite que o conteúdo principal ocupe o espaço disponível */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/questao/:id" element={<QuestaoPage />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
