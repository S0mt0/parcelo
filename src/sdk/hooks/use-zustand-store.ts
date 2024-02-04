import { create } from "zustand";

interface ResetForm {
  activeForm: "email" | "otp";
  setActiveForm: (form: "email" | "otp") => void;

  activeFormTab: "login" | "sign-up";
  setActiveFormTab: (form: "login" | "sign-up") => void;
}

export const useAuthForms = create<ResetForm>((set) => ({
  activeForm: "email",
  setActiveForm: (form) => set(() => ({ activeForm: form })),

  activeFormTab: "login",
  setActiveFormTab: (form) => set(() => ({ activeFormTab: form })),
}));
