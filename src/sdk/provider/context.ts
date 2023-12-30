import { createContext } from "react";
import { AuthProviderInitState } from "./init-state";
import { TAuthContext } from "../../sdk";

export const AuthContext = createContext<TAuthContext>(AuthProviderInitState);
