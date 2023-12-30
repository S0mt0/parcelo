import { Loader } from "lucide-react";

export const LoadingUI = () => {
  return (
    <div className="loader md:h-screen w-full flex flex-col justify-center items-center bg-neutral-100">
      <Loader className="animate-spin w-8 h-8 text-orange-600" />
      <span className="text-sm">Please wait...</span>
    </div>
  );
};
