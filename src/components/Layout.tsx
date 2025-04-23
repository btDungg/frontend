import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
