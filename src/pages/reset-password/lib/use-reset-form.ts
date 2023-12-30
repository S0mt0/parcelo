import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";

import { validateResetForm } from "./validation";
import axios from "../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../sdk";

export interface ResetPayload {
  newPassword: string;
  confirmPassword: string;
}

export const useResetForm = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/dashboard/shipment";

  const formik = useFormik<ResetPayload>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: validateResetForm,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      authDispatch({ type: AuthActions.START_LOADING });
      const token = JSON.parse(localStorage.getItem("reset_token")!);

      try {
        const { data } = await axios.patch("/forgot-password", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        authDispatch({
          type: AuthActions.SET_AUTH,
          payload: {
            profile: data?.data?.user,
            token: data?.data?.accessToken,
          },
        });
        toast.success(data?.message);
        localStorage.removeItem("reset_token");
        localStorage.removeItem("otp_msg");

        fn.resetForm();
        // redirect to dashboard
        navigate(from, { preventScrollReset: true, replace: true });
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
