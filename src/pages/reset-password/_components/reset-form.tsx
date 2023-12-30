import { useRef, useState } from "react";
import { EyeOff, Eye, Loader2, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../../components";
import { cn } from "../../../lib/utils";

import { useAuth } from "../../../sdk";
import { useResetForm } from "../lib";

export const ResetForm = () => {
  const [isVisible, setisVisible] = useState({ nP: false, cP: false });
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const cPasswordInputRef = useRef<HTMLInputElement>(null);

  if (passwordInputRef?.current) {
    passwordInputRef.current.type = isVisible.nP ? "text" : "password";
  }

  if (cPasswordInputRef?.current) {
    cPasswordInputRef.current.type = isVisible.cP ? "text" : "password";
  }

  const toggleVisibility = (p: "nP" | "cP") => {
    p === "nP" && setisVisible((current) => ({ ...current, nP: !current.nP }));
    p === "cP" && setisVisible((current) => ({ ...current, cP: !current.cP }));
  };

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const formik = useResetForm();

  return (
    <form
      className="my-4 p-4 flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
      style={{ gap: "1rem", rowGap: "1rem" }}
    >
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            {isVisible.nP ? (
              <EyeOff
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("nP")}
              />
            ) : (
              <Lock
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("nP")}
              />
            )}
          </span>

          <input
            type="password"
            name="newPassword"
            autoComplete="on"
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none select-none",
              formik.touched.newPassword &&
                formik.errors.newPassword &&
                "ring-2 ring-red-800"
            )}
            placeholder="New password"
            ref={passwordInputRef}
            required
            aria-required
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            {isVisible.cP ? (
              <EyeOff
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("cP")}
              />
            ) : (
              <Eye
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("cP")}
              />
            )}
          </span>

          <input
            type="password"
            name="confirmPassword"
            autoComplete="on"
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none select-none",
              formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "ring-2 ring-red-800"
            )}
            placeholder="Confirm password"
            ref={cPasswordInputRef}
            required
            aria-required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div>
        <p className="text-white text-[13px]">
          <span>Already have an account?</span>
          <Button variant="link" className=" text-orange-500 h-0" asChild>
            <Link to={"/sign-in"}>Login.</Link>
          </Button>
        </p>
      </div>
      <div>
        <Button
          className="w-full rounded-none bg-orange-400/75 hover:bg-orange-400  disabled:cursor-not-allowed disabled:bg-orange-400"
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
