import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const PrivacyPolicy = lazy(() => import('./pages/policyPage/privacyPolicy'));
const TermsOfService = lazy(() => import('./pages/policyPage/termsOfService'));

const Login = lazy(() => import('./pages/loginpage/login'));
const Agree = lazy(() => import('./pages/loginpage/agree'));
const Join = lazy(() => import('./pages/loginpage/join'));

const KakaoCallback = lazy(() => import('./pages/auth/kakaoCallback'));

const Profile = lazy(() => import('./pages/loginpage/profile'));
const Passwordchange = lazy(() => import('./pages/loginpage/passwordchange'));

const RouteCreate = lazy(() => import('./pages/routepage/routeCreator'));

const Createpost = lazy(() => import('./pages/coursepost/createpost'));
const Postlist = lazy(() => import('./pages/coursepost/postlist'));
const Updatepost = lazy(() => import('./pages/coursepost/updatepost'));
const Viewpost = lazy(() => import('./pages/coursepost/viewpost'));

const MyCourse = lazy(() => import('./pages/myPage/myCourse'));
const SaveCourse = lazy(() => import('./pages/myPage/saveCourse'));

const NotFound = lazy(() => import('./pages/errors/notFoundPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loadingTag">Loading...</div>}>
        <Routes>
          {/* AuthLayout 사용 */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="agree" element={<Agree />} />
            <Route path="join" element={<Join />} />
          </Route>

          <Route path="auth/kakao/callback" element={<KakaoCallback />} />

          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="region" element={<Region />} />
            <Route path="extra" element={<Extra />} />
            <Route path="concept" element={<Concept />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="termsOfService" element={<TermsOfService />} />
            <Route path="routeCreator" element={<RouteCreate />} />
            {/* ProtectedLayout을 사용하여 보호된 페이지들을 보호 */}
            <Route element={<ProtectLayout />}>
              <Route path="createpost" element={<Createpost />} />
              <Route path="postlist" element={<Postlist />} />
              <Route path="updatepost" element={<Updatepost />} />
              <Route path="viewpost" element={<Viewpost />} />
              <Route
                path=""
                element={
                  <MyPageLayout
                    title="내 활동"
                    data={[
                      { path: '/myCourse', name: '나의 코스' },
                      { path: '/saveCourse', name: '저장한 코스' },
                    ]}
                  />
                }
              >
                <Route path="myCourse" element={<MyCourse />} />
                <Route path="saveCourse" element={<SaveCourse />} />
              </Route>
              <Route
                path=""
                element={
                  <MyPageLayout
                    title="계정 설정"
                    data={[
                      { path: '/profile', name: '프로필 설정' },
                      { path: '/passwordchange', name: '비밀 번호 변경' },
                    ]}
                  />
                }
              >
                <Route path="profile" element={<Profile />} />
                <Route path="passwordchange" element={<Passwordchange />} />
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
