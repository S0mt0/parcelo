import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import axios from "../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../sdk";
import { FormEvent } from "react";

export const useOtpForm = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    value: string | number
  ) => {
    e.preventDefault();
    if (!value) {
      return toast.error("Enter the OTP sent to your email");
    }

    /** Handle form submission */
    authDispatch({ type: AuthActions.START_LOADING });

    try {
      const { data } = await axios.post(
        "/verify-token",
        { otp: value },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem(
        "reset_token",
        JSON.stringify(data?.data?.reset_access_token)
      );

      toast.success(data?.message);

      navigate("/account/reset-password");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      authDispatch({ type: AuthActions.END_LOADING });
    }
  };

  return handleSubmit;
};
