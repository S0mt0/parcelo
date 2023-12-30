import { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import { toast } from "sonner";
import { ArrowLeftCircle, Loader, Loader2 } from "lucide-react";

import { Button } from "../../../components";

import { useAuth, useAuthForms } from "../../../sdk";
import axios from "../../../sdk/api/config";

import { useOtpForm } from "../lib";

export const OtpForm = () => {
  const [otp, setOtp] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(60);
  const [isResending, setIsResending] = useState(false);

  const toggleForm = useAuthForms((state) => state.setActiveForm);

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const handleSubmit = useOtpForm();
  const handleChange = (otp: string) => setOtp(otp);

  const handleResendOtp = async () => {
    setIsButtonDisabled(true);
    setIsResending(true);
    startCountDown();

    try {
      const { data } = await axios.get("/resend-otp", {
        withCredentials: true,
      });
      toast.success(data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsResending(false);
    }
  };

  const startCountDown = () => {
    const timer = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsButtonDisabled(false);
      setCountDown(60);
    }, 60000);
  };

  useEffect(() => {
    return () => {
      setIsButtonDisabled(false);
      setCountDown(60);
    };
  }, []);

  const message = JSON.parse(localStorage.getItem("otp_msg")!);

  return (
    <form
      className="my-4 p-4 flex flex-col gap-y-4"
      onSubmit={(e) => handleSubmit(e, otp)}
      style={{ gap: "1rem", rowGap: "1rem" }}
    >
      <small className="text-center text-slate-200 mb-2">
        {message || "Enter the 6 digit OTP that was sent to your email"}
      </small>
      <div className="overflow-x-auto p-1 w-full">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          containerStyle="flex justify-center gap-3 items-center w-full"
          inputStyle={{
            width: "2.2em",
            height: "2.2em",
            fontSize: "1.3em",
            fontWeight: "400",
            background: "none",
            color: "white",
            border: "2px solid rgb(226 232 240/0.6)",
            outline: "none",
          }}
          isInputNum={true}
          shouldAutoFocus={true}
          focusStyle="ring-2 ring-orange-400/75"
        />
      </div>
      <div className="mt-4">
        <Button
          className="w-full rounded-none bg-orange-400/80 hover:bg-orange-400/90 disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="animate-spin" /> : <span>Verify</span>}
        </Button>
      </div>

      <div className="flex gap-2 items-center justify-between">
        <span
          className="text-muted/60 text-[12px] hover:no-underline flex items-center font-medium"
          role="button"
          onClick={() => toggleForm("email")}
        >
          Wrong email?
          <ArrowLeftCircle className="text-muted/60 h-5 w-5 ml-1" />
        </span>

        <Button
          className="text-muted/60 text-[12px] hover:no-underline flex items-center disabled:text-neutral-400/30 h-0 bg-transparent p-0"
          role="button"
          onClick={handleResendOtp}
          disabled={isButtonDisabled}
        >
          {isResending && (
            <span>
              <Loader className="text-muted-foreground h-4 w-4 animate-spin mr-1" />
            </span>
          )}
          <span>Resend OTP&nbsp;</span>
          {isButtonDisabled && (
            <span>
              in
              <strong className="font-medium text-muted/75 pl-1">
                {countDown}s
              </strong>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};
