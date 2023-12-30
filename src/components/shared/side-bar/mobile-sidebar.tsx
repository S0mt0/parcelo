import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../../ui";
import { SideBar } from "./sidebar";

export const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pl-2 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
