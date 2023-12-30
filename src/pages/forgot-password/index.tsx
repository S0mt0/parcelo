import { LockKeyhole } from "lucide-react";

import { useAuthForms } from "../../sdk";

import { EmailForm } from "./_components/email-form";
import { OtpForm } from "./_components/otp-form";

const ForgotPasswordPage = () => {
  const active = useAuthForms((state) => state.activeForm);

  return (
    <div
      className="flex items-center justify-center p-6  min-h-screen bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('../bg-03.jpg')" }}
    >
      <div className="w-full max-w-[420px] mx-auto border border-slate-300/30 bg-black/30 shadow-md  backdrop-blur-[6px] flex flex-col ">
        <div className="border-b border-slate-300/30 px-4 py-3 flex items-center justify-center">
          <p className="text-slate-200 text-xl flex items-center">
            <LockKeyhole className="text-orange-400 mr-2 h-6 w-6" />
          </p>
        </div>
        {active === "email" ? <EmailForm /> : <OtpForm />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
