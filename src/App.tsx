import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PageLoader from './components/ui/PageLoader';

export default function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
