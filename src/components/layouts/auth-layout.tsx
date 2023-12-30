import { Outlet } from "react-router-dom";
import { Logo } from "..";

const AuthLayout = () => {
  return (
    <>
      <div className="fixed top-0 w-full py-4 px-4 sm:px-12">
        <Logo />
      </div>
      <Outlet />
    </>
  );
};

export default AuthLayout;
