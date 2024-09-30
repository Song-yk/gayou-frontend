import { Outlet } from 'react-router-dom';
import MyPageNavBar from '../../pages/navbar/myPageNavBar';

function MyPageLayout(props) {
  return (
    <div>
      <main>
        <MyPageNavBar content={<Outlet />} data={props} />
      </main>
    </div>
  );
}

export default MyPageLayout;
