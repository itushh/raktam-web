import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { RequestBlood } from './pages/RequestBlood.jsx';
import { RaktamAI } from './pages/RaktamAI.jsx';
import { CBTAnalysis } from './pages/ai/CBTAnalysis.jsx';
import { CureDisease } from './pages/ai/CureDisease.jsx';
import { HealthTrack } from './pages/ai/HealthTrack.jsx';
import { UnderConstruction } from './pages/UnderConstruction.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col font-body antialiased">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/request-blood" element={<RequestBlood />} />
              <Route path="/raktam-ai" element={<RaktamAI />} />
              <Route path="/ai/cbt-analysis" element={<CBTAnalysis />} />
              <Route path="/ai/cure-disease" element={<CureDisease />} />
              <Route path="/ai/health-track" element={<HealthTrack />} />
              <Route path="*" element={<UnderConstruction />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
