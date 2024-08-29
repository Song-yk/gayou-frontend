import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/navbar/navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
