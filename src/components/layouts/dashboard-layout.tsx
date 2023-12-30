import { Outlet } from "react-router-dom";
import { NavBar, SideBar } from "../shared";

const DashBoardLayout = () => {
  return (
    <div className="h-full w-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="h-[64px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="md:pl-56 pt-[64px] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
