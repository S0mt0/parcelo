import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "../../../lib/utils";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

export const SideBarItem = ({ icon: Icon, label, to }: SideBarItemProps) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isActive = pathname === to;

  const onClick = () => navigate(to);

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-700 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 outline-none focus:ring-0",
        isActive &&
          "text-white bg-orange-600/95 hover:bg-orange-600/95 hover:text-white"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon className={cn("text-slate-500", isActive && "text-amber-200")} />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-amber-300/80 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
