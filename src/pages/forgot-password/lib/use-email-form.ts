import { toast } from "sonner";

import axios from "../../../sdk/api/config/index";
import { AuthActions, useAuth, useAuthForms } from "../../../sdk";
import { FormEvent } from "react";

export const useEmailForm = () => {
  const { authDispatch } = useAuth();
  const toggleForm = useAuthForms((state) => state.setActiveForm);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    /** valiate form field */
    if (!value?.trim()) {
      return toast.error("Enter your email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return toast.error("Invalid email address");
    }

    /** Handle submission */
    authDispatch({ type: AuthActions.START_LOADING });

    try {
      const { data } = await axios.post(
        "/forgot-password",
        { email: value },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("otp_msg", JSON.stringify(data?.message));
      toast.success(data?.message);

      toggleForm("otp");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      authDispatch({
        type: AuthActions.END_LOADING,
      });
    }
  };

  return handleSubmit;
};
