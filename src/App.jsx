
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './pages/auth/AdminLogin';
import Header from './components/layout/Header';
import Home from './pages/Home';
import AdminPanel from './pages/auth/AdminPanel';

function App() {

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
    </Router>
  )
}

export default App
