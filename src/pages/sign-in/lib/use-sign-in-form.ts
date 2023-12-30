import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import axios from "../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../sdk";
import { validateSignIn } from "./validation";

export interface SignInValues {
  password: string;
  email: string;
}

export const useSignInForm = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/dashboard/shipment";

  const formik = useFormik<SignInValues>({
    initialValues: { email: "", password: "" },
    validate: validateSignIn,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      const payload = { email: values.email, password: values.password };
      authDispatch({ type: AuthActions.START_LOADING });

      try {
        const { data } = await axios.post("/auth/sign-in", payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        authDispatch({
          type: AuthActions.SET_AUTH,
          payload: {
            profile: data?.data?.user,
            token: data?.data?.accessToken,
          },
        });
        toast.success(data?.message);

        fn.resetForm();
        // redirect to dashboard
        navigate(from, { preventScrollReset: true });
      } catch (error: any) {
        toast.error(error?.response?.data?.message);

        authDispatch({
          type: AuthActions.SET_ERROR,
          payload: error?.response?.data?.message,
        });
      }
    },
  });

  return formik;
};
