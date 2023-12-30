import { Dispatch, SetStateAction } from "react";
import { TAuth } from "../auth";
import { TAuthAction } from "../actions";

export type TAuthContext = {
  authStore: TAuth;
  authDispatch: Dispatch<TAuthAction>;
  persistLogin: boolean;
  setPersistLogin: Dispatch<SetStateAction<boolean>>;
};
