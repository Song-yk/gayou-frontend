import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLayout = lazy(() => import('./components/layout/mainLayout'));

const Home = lazy(() => import('./pages/homepage/home'));
const Region = lazy(() => import('./pages/optionspage/region'));
const Extra = lazy(() => import('./pages/optionspage/extra'));
const Concept = lazy(() => import('./pages/optionspage/concept'));
const RouteCreate = lazy(() => import('./pages/routepage/routeCreator')); //./pages/aipage/aiRouteCreator
const MyPageLayout = lazy(() => import('./components/layout/myPageLayout'));

const Createpost = lazy(() => import('./pages/coursepost/createpost'));
const Postlist = lazy(() => import('./pages/coursepost/postlist'));
const Updatepost = lazy(() => import('./pages/coursepost/updatepost'));
const Viewpost = lazy(() => import('./pages/coursepost/viewpost'));

const MyCourse = lazy(() => import('./pages/myPage/myCourse'));

const NotFound = lazy(() => import('./pages/errors/notFoundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="region" element={<Region />} />
            <Route path="extra" element={<Extra />} />
            <Route path="concept" element={<Concept />} />
            <Route path="routeCreator" element={<RouteCreate />} />
            <Route path="myPage" element={<MyPageLayout />}>
              <Route path="createpost" element={<Createpost />} />
              <Route path="postlist" element={<Postlist />} />
              <Route path="updatepost" element={<Updatepost />} />
              <Route path="viewpost" element={<Viewpost />} />
              <Route path="" element={<MyCourse />} />
              <Route path="myCourse" element={<MyCourse />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
