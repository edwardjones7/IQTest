import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
