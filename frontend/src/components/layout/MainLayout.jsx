import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col text-on-surface bg-surface font-body-md overflow-x-hidden">
      <Sidebar />
      <main className="lg:ml-[280px] flex-grow pb-stack-lg">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
