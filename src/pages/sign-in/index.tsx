import { cn } from "../../lib/utils";

import { useAuthForms } from "../../sdk";

import { SignInForm } from "./_components/sign-in-form";
import { SignUpForm } from "./_components/sign-up-form";

const SignInPage = () => {
  const active = useAuthForms((state) => state.activeFormTab);
  const setActiveTab = useAuthForms((state) => state.setactiveFormTab);

  return (
    <div
      className="flex items-center justify-center p-6 min-h-screen bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('bg-03.jpg')" }}
    >
      <div className="w-full max-w-[420px] mx-auto border border-slate-300/30 bg-black/30 shadow-md  backdrop-blur-[6px] flex flex-col">
        <div className="flex">
          <div
            className={cn(
              "flex-1 shrink-0 flex justify-center items-center border-b border-slate-300/30",
              active === "login" && "border-orange-400"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-slate-300 w-full flex justify-center items-center cursor-pointer px-4 py-3",
                active === "login" && "text-orange-400 cursor-default"
              )}
              onClick={() => setActiveTab("login")}
            >
              Login
            </p>
          </div>
          <div
            className={cn(
              "flex-1 shrink-0 flex justify-center items-center border-b border-slate-300/30",
              active === "sign-up" && "border-orange-400"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-slate-300 w-full flex justify-center items-center cursor-pointer px-4 py-3",
                active === "sign-up" && "text-orange-400 cursor-default"
              )}
              onClick={() => setActiveTab("sign-up")}
            >
              Sign Up
            </p>
          </div>
        </div>
        <div className="w-full my-6 p-4">
          {active === "login" ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
