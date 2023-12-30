import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AppLayout = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <Toaster expand={true} closeButton={true} />
      <Outlet />
    </main>
  );
};

export default AppLayout;
