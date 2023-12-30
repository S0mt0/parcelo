import axios from "../api/config";
import { AuthActions } from "../constants";
import { useAuth } from ".";
import { AuthInitState } from "../initial-states";

export const useLogout = () => {
  const { authDispatch } = useAuth();

  const logout = async () => {
    try {
      authDispatch({
        type: AuthActions.SET_AUTH,
        payload: {
          profile: AuthInitState.authProfile,
          token: AuthInitState.accessToken,
        },
      });
      await axios("/auth/sign-out", { withCredentials: true });
    } catch (error: any) {
      console.log("[LOGOUT ERROR]: ", error);
    }
  };
  return logout;
};
