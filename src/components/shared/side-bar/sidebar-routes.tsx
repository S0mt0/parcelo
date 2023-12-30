import { CopyPlus, Settings, Truck } from "lucide-react";
import { SideBarItem } from "./sidebar-item";

const routes = [
  {
    icon: CopyPlus,
    label: "Add Shipment",
    to: "/dashboard/shipment/new",
  },
  {
    icon: Truck,
    label: "All Shipments",
    to: "/dashboard/shipment",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/dashboard/profile",
  },
];

export const SideBarRoutes = () => {
  return (
    <div className="flex flex-col w-full border-t border-orange-300/50">
      {routes.map((route) => (
        <SideBarItem
          key={route.to}
          icon={route.icon}
          label={route.label}
          to={route.to}
        />
      ))}
    </div>
  );
};
