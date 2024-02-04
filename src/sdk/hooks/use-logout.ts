import axios from "../api/config";
import { AuthActions } from "../constants";
import { useAuth } from ".";
import { AuthInitState } from "../initial-states";
import { toast } from "sonner";

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
      toast.error("Something went wrong, please try again.");
    }
  };
  return logout;
};
