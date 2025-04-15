import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex max-h-screen overflow-y-auto">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-[#FAFAFA] overflow-auto">
          <Outlet />
        </main>
        <footer className="text-center py-4 text-sm border-t">
          © amasQIS.ai
        </footer>
      </div>
    </div>
  );
};

export default Layout;
