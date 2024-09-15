import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const token = localStorage.getItem('token');

  // 토큰이 존재하면 대시보드로 리다이렉트
  if (token) {
    return <Navigate to="/" />;
  }

  // 토큰이 없으면 자식 컴포넌트 렌더링
  return (
    <div className="auth-container">
      {/* 공통 레이아웃 스타일이나 로고, 헤더 등을 추가할 수 있습니다. */}
      <Outlet /> {/* 하위 경로 컴포넌트를 렌더링 */}
    </div>
  );
};

export default AuthLayout;
