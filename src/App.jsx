import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLayout = lazy(() => import('./components/layout/mainLayout'));
const MyPageLayout = lazy(() => import('./components/layout/myPageLayout'));
const ProtectLayout = lazy(() => import('./components/layout/ProtectLayout'));
const AuthLayout = lazy(() => import('./components/layout/AuthLayout'));

// 페이지 컴포넌트들
const Home = lazy(() => import('./pages/homepage/home'));
const Region = lazy(() => import('./pages/optionspage/region'));
const Extra = lazy(() => import('./pages/optionspage/extra'));
const Concept = lazy(() => import('./pages/optionspage/concept'));

const Login = lazy(() => import('./pages/loginpage/login'));
const Signup = lazy(() => import('./pages/loginpage/signup'));
const Agree = lazy(() => import('./pages/loginpage/agree'));
const Join = lazy(() => import('./pages/loginpage/join'));
const Profile = lazy(() => import('./pages/loginpage/profile'));
const Passwordchange = lazy(() => import('./pages/loginpage/passwordchange'));

const RouteCreate = lazy(() => import('./pages/routepage/routeCreator'));

const Createpost = lazy(() => import('./pages/coursepost/createpost'));
const Postlist = lazy(() => import('./pages/coursepost/postlist'));
const Updatepost = lazy(() => import('./pages/coursepost/updatepost'));
const Viewpost = lazy(() => import('./pages/coursepost/viewpost'));

const MyCourse = lazy(() => import('./pages/myPage/myCourse'));

const NotFound = lazy(() => import('./pages/errors/notFoundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loadingTag">Loading...</div>}>
        <Routes>
          {/* AuthLayout 사용 */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="agree" element={<Agree />} />
            <Route path="join" element={<Join />} />
          </Route>

          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="region" element={<Region />} />
            <Route path="extra" element={<Extra />} />
            <Route path="concept" element={<Concept />} />
            <Route path="routeCreator" element={<RouteCreate />} />
            {/* ProtectedLayout을 사용하여 보호된 페이지들을 보호 */}
            <Route element={<ProtectLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="passwordchange" element={<Passwordchange />} />
              <Route path="createpost" element={<Createpost />} />
              <Route path="postlist" element={<Postlist />} />
              <Route path="updatepost" element={<Updatepost />} />
              <Route path="viewpost" element={<Viewpost />} />

              {/* MyPageLayout을 보호된 레이아웃으로 래핑 */}
              <Route path="" element={<MyPageLayout />}>
                <Route path="myPage" element={<MyCourse />} />
                <Route path="myCourse" element={<MyCourse />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
