import { toast } from "sonner";

import { ResetPayload } from ".";

/**
 * Validation function for reset password form
 * @param {ResetPayload} values
 * @returns Validation errors
 */
export const validateResetForm = (values: ResetPayload) => {
  const errors: Partial<ResetPayload> = {};

  if (!values.newPassword.trim()) {
    errors.newPassword = toast.error("Please choose a password") as string;
  } else if (values.newPassword.length < 6) {
    errors.newPassword = toast.error(
      "Password must have at least six characters"
    ) as string;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.newPassword)
  ) {
    errors.newPassword = toast.error(
      "At least one number, a symbol, uppercase and lowercase letters are required."
    ) as string;
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = toast.error("Passwords do not match") as string;
  }

  return errors;
};
