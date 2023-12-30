import { TAuth } from "../../sdk";

export const AuthInitState: TAuth = {
  authProfile: {
    username: "",
    email: "",
    avatar: "",
  },

  accessToken: "",

  state: {
    loading: false,
    error: false,
    errorMessage: null,
    successMessage: null,
    success: false,
  },
};
