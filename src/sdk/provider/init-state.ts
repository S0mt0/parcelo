import { TAuthContext } from "../../sdk";

export const AuthProviderInitState: TAuthContext = {
  authStore: {
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
  },
  persistLogin: false,
  authDispatch: () => null,
  setPersistLogin: () => null,
};
