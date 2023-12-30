import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

import { useAuth, useRefreshToken } from "../../sdk";

export const RequireAuth = () => {
  const {
    authStore: { accessToken: authenticated },
  } = useAuth();

  const location = useLocation();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const {
    authStore: { accessToken },
    persistLogin,
  } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, accessToken]);

  return (
    <>
      {!persistLogin ? (
        <Outlet />
      ) : isLoading ? (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-100">
          <Loader className="animate-spin w-8 h-8 text-orange-600" />
          <span className="text-sm">Please wait...</span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
