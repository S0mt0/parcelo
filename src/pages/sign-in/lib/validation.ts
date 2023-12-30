import { toast } from "sonner";

import { SignInValues, SignUpValues } from ".";

/**
 * Validation function for Login form
 * @param {SignInValues} values
 * @returns Validation errors
 */
export const validateSignIn = (values: SignInValues) => {
  const errors: Partial<SignInValues> = {};

  if (!values.email.trim()) {
    errors.email = toast.error("Email is required") as string;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address") as string;
  }

  if (!values.password.trim()) {
    errors.password = toast.error("Password is required") as string;
  }

  return errors;
};

/**
 * Validation function for Sign up form
 * @param {SignUpValues} values
 * @returns Validation errors
 */
export const validateSignUp = (values: SignUpValues) => {
  const errors: Partial<SignUpValues> = {};

  if (!values.username.trim()) {
    errors.username = toast.error("Email is required") as string;
  } else if (values.username.length < 3) {
    errors.username = toast.error(
      "Username must not be less than three characters"
    ) as string;
  }

  if (!values.email.trim()) {
    errors.email = toast.error("Email is required") as string;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address") as string;
  }

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
