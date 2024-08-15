import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy loading을 위해 동적으로 import
const Home = lazy(() => import('./pages/homepage/home')); // 파일 경로와 확장자를 확인
const Region = lazy(() => import('./pages/optionspage/region'));
const Extra = lazy(() => import('./pages/optionspage/extra'));
const Concept = lazy(() => import('./pages/optionspage/concept'));
const RouteCreate = lazy(() => import('./pages/aipage/aiRouteCreator'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/region" element={<Region />} />
          <Route path="/extra" element={<Extra />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="/routeCreator" element={<RouteCreate />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
