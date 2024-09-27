import { Outlet } from 'react-router-dom';
import MyPageNavBar from '../../pages/navbar/myPageNavbar';

function MyPageLayout() {
  return (
    <div>
      <main>
        <MyPageNavBar content={<Outlet />} />
      </main>
    </div>
  );
}

export default MyPageLayout;
