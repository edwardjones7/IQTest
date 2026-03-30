import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <footer className="text-center py-4 text-xs text-warm-400 no-print">
        Powered by{' '}
        <a
          href="https://www.elenos.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-500 hover:text-warm-700 font-medium transition-colors"
        >
          Elenos
        </a>
      </footer>
    </div>
  );
}
