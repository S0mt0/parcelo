import { AuthActions, TAuth, TAuthAction } from "../../sdk";

export const authReducer = (authState: TAuth, action: TAuthAction): TAuth => {
  const { type, payload } = action;

  switch (type) {
    case AuthActions.START_LOADING:
      return {
        ...authState,
        state: {
          ...authState.state,
          error: false,
          loading: true,
          success: false,
        },
      };

    case AuthActions.SET_TOKEN:
      return {
        ...authState,
        accessToken: payload,
        state: {
          ...authState.state,
          error: false,
          loading: false,
          success: true,
        },
      };

    case AuthActions.SET_AUTH_PROFILE:
      return {
        ...authState,
        authProfile: payload,
        state: {
          ...authState.state,
          error: false,
          loading: false,
          success: true,
        },
      };

    case AuthActions.SET_AUTH:
      return {
        ...authState,
        authProfile: payload.profile,
        accessToken: payload.token,
        state: {
          ...authState.state,
          error: false,
          loading: false,
          success: true,
        },
      };

    case AuthActions.SET_ERROR:
      return {
        ...authState,
        state: {
          ...authState.state,
          error: true,
          loading: false,
          success: false,
          errorMessage: payload,
        },
      };

    case AuthActions.SET_SUCCESS_MESSAGE:
      if (!payload) alert("No success message provided");

      return {
        ...authState,
        state: {
          ...authState.state,
          error: false,
          loading: false,
          success: true,
          successMessage: payload,
        },
      };

    case AuthActions.END_LOADING:
      return {
        ...authState,
        state: {
          ...authState.state,
          loading: false,
        },
      };

    default:
      return authState;
  }
};
