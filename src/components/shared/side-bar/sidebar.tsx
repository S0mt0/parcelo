import { Logo } from "../logo";
import { SideBarRoutes } from "./sidebar-routes";

export const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm border-orange-300/50">
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};
