import { useFormik } from "formik";
import { toast } from "sonner";

import { validateSignUp } from "./validation";
import axios from "../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../sdk";

export interface SignUpValues {
  username: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}

export const useSignUpForm = () => {
  const { authDispatch } = useAuth();

  const formik = useFormik<SignUpValues>({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
      username: "",
    },
    validate: validateSignUp,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      authDispatch({ type: AuthActions.START_LOADING });
      const payload = {
        username: values.username,
        email: values.email,
        password: values.confirmPassword,
      };

      try {
        const res = await axios.post("/auth/sign-up", payload);
        console.log(res);
        toast.success(res.data?.message);
        authDispatch({
          type: AuthActions.END_LOADING,
        });

        fn.resetForm();
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
