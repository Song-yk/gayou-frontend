import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/navbar/navbar';
import Footer from '../../pages/homepage/footer';
import '../../components/layout/msinLayout.css';

const MainLayout = () => {
  const isTokenExpired = () => {
    const expiresAt = localStorage.getItem('expiresAt');
    if (!expiresAt) return true;

    return new Date().getTime() > expiresAt;
  };

  if (isTokenExpired()) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
  }

  const expiresAt = new Date().getTime() + 3600 * 1000;
  localStorage.setItem('expiresAt', expiresAt);

  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
