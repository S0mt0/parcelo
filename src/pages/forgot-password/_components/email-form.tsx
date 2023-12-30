import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightCircle, Loader2, Mail } from "lucide-react";

import { useAuth, useAuthForms } from "../../../sdk";

import { Button } from "../../../components";
import { useEmailForm } from "../lib";

export const EmailForm = () => {
  const [email, setEmail] = useState("");

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const handleSubmit = useEmailForm();
  const toggleForm = useAuthForms((state) => state.setActiveForm);

  return (
    <form
      className="my-4 p-4 flex flex-col gap-y-4"
      onSubmit={(e) => handleSubmit(e, email)}
      style={{ gap: "1rem", rowGap: "1rem" }}
    >
      <small className="text-center text-slate-200 mb-4">
        Please enter your email address. We will send you an email with a code
        to reset your password.
      </small>

      <p className="relative bg-transarent pr-10 border border-slate-300/30">
        <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
          <Mail className="text-white w-5 h-5" />
        </span>
        <input
          type="email"
          name="email"
          autoComplete="on"
          className={
            "w-full p-2 text-sm border-none bg-transparent outline-none text-white backdrop-blur-[4px]"
          }
          placeholder="Email@example.com"
          required
          aria-required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white text-[12px] space-x-2">
          <span>Already have an account?</span>
          <Button
            className=" text-orange-500 p-0 h-0 font-medium"
            variant={"link"}
            asChild
          >
            <Link to={"/sign-in"}>Login.</Link>
          </Button>
        </p>

        <p className="text-white text-[12px] flex items-center">
          <span
            role="button"
            className="text-muted/60 text-[12px] hover:no-underline h-0 flex items-center font-medium"
            onClick={() => toggleForm("otp")}
          >
            Enter OTP
            <ArrowRightCircle className="text-muted/60 h-5 w-5 ml-1" />
          </span>
        </p>
      </div>
      <div className="mt-2">
        <Button
          className="w-full rounded-none bg-orange-400/80 hover:bg-orange-400/90 disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Let's Go</span>
          )}
        </Button>
      </div>
    </form>
  );
};
