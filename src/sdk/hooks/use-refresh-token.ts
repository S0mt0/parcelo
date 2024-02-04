import axios from "../api/config";
import { AuthActions } from "../constants";
import { useAuth } from ".";
import { toast } from "sonner";

export const useRefreshToken = () => {
  const { authDispatch } = useAuth();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });

      const token: string = data?.data?.accessToken;

      authDispatch({
        type: AuthActions.SET_AUTH,
        payload: {
          profile: data?.data?.user,
          token,
        },
      });

      return token;
    } catch (error) {
      console.log("[REFRESH ERROR]: ", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  return refresh;
};
