import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
