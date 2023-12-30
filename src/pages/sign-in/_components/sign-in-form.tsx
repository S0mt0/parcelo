import { useEffect, useRef, useState } from "react";
import { Mail, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components";

import { useAuth } from "../../../sdk";
import { useSignInForm } from "../lib";

export const SignInForm = () => {
  const [isVisible, setisVisible] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  if (passwordInputRef?.current) {
    passwordInputRef.current.type = isVisible ? "text" : "password";
  }

  const toggleVisibility = () => {
    setisVisible((current) => !current);
  };

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const formik = useSignInForm();

  const [persist, setPersist] = useState(false);
  const togglePersist = () => {
    setPersist((current) => !current);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={formik.handleSubmit}
      style={{ gap: "1rem", rowGap: "1rem" }}
    >
      <p className="relative bg-slate-100 pr-10">
        <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
          <Mail className="text-white w-5 h-5" />
        </span>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="on"
          className={cn(
            "w-full p-2 text-sm border-none bg-transparent outline-none",
            formik.touched.email && formik.errors.email && "ring-2 ring-red-800"
          )}
          placeholder="Email@example.com"
          required
          aria-required
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </p>
      <p className="relative bg-slate-100 pr-10">
        <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
          {isVisible ? (
            <EyeOff
              className="text-white w-5 h-5 cursor-pointer"
              onClick={toggleVisibility}
            />
          ) : (
            <Eye
              className="text-white w-5 h-5 cursor-pointer"
              onClick={toggleVisibility}
            />
          )}
        </span>

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          className={cn(
            "w-full p-2 text-sm border-none bg-transparent outline-none",
            formik.touched.password &&
              formik.errors.password &&
              "ring-2 ring-red-800"
          )}
          placeholder="Your password"
          ref={passwordInputRef}
          required
          aria-required
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </p>
      <div className="flex justify-between items-center py-2">
        <p className="text-white flex gap-2 items-center">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            checked={persist}
            onChange={togglePersist}
          />
          <label htmlFor="rememberMe" className="cursor-pointer text-[14px]">
            Remember me
          </label>
        </p>
        <p className="text-white text-[13px]">
          <Link
            to="/account/forgot-password"
            className="hover:text-white/75 transition"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
      <div>
        <Button
          className={cn(
            "w-full rounded-none bg-orange-400/80 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-400",
            loading && "bg-orange-400"
          )}
          disabled={loading}
          type="submit"
        >
          {loading ? <Loader2 className="animate-spin" /> : <span>Login</span>}
        </Button>
      </div>
    </form>
  );
};
