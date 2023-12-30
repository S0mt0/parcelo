import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnlockKeyhole } from "lucide-react";

import { ResetForm } from "./_components/reset-form";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("reset_token")!);
    !token && navigate("/sign-in");
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-center p-6  min-h-screen bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('../bg-03.jpg')" }}
    >
      <div className="w-full max-w-[420px] mx-auto border border-slate-300/30 bg-black/30 shadow-md  backdrop-blur-[6px] flex flex-col ">
        <div className="border-b border-slate-300/30 px-4 py-3 flex items-center justify-center">
          <p className="text-slate-200 text-xl flex items-center">
            <UnlockKeyhole className="text-orange-400 mr-2 h-6 w-6" />
          </p>
        </div>
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
