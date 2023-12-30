import { useContext } from "react";
import { AuthContext } from "../provider/context";

export const useAuth = () => {
  return useContext(AuthContext);
};
