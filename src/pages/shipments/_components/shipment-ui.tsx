import { Link } from "react-router-dom";

import { TShipments, useAuth, useAxiosPrivate } from "../../../sdk";
import { PackageOpen, PencilLine, Table2Icon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ShipmentUI = ({
  shipments,
  setShipments,
}: {
  shipments: TShipments;
  setShipments: React.Dispatch<React.SetStateAction<TShipments>>;
}) => {
  const {
    authStore: { authProfile },
  } = useAuth();
  const time = new Date().getHours();

  const greeting = () => {
    if (time <= 12) {
      return `Good morning, ${authProfile.username || "Champ"}!`;
    } else if (time >= 12 && time <= 17) {
      return `Good afternoon, ${authProfile.username || "Champ"}!`;
    } else {
      return `Good evening, ${authProfile.username || "Champ"}!`;
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-orange-800/95 mb-2">
        {greeting()}
      </h2>
      <p className="text-sm text-slate-600">
        {shipments?.length
          ? `You have ${shipments?.length} active shipment(s) on your list.`
          : "You have no active shipments yet."}
      </p>

      {shipments?.length ? (
        <div className="overflow-x-auto h-fit mt-16 w-full whitespace-nowrap text-ellipsis scroll-smooth shadow-sm">
          <table className="w-full capitalize bg-white border-collapse border border-orange-300/50">
            <TableHead />
            <tbody>
              {shipments.map((s, i) => (
                <TableData
                  key={i}
                  trackingId={s.trackingId}
                  cCountry={s.belongsTo.country}
                  cName={s.belongsTo.fullName}
                  cEmail={s.belongsTo.email}
                  setShipments={setShipments}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-24 grid place-items-center text-muted-foreground/75 text-sm">
          <PackageOpen className="text-orange-400/60 h-10 w-10" />
          <span>
            <Link
              to={"/dashboard/shipment/new"}
              className="underline hover:text-orange-800/95"
            >
              Create new shipments
            </Link>
          </span>
        </p>
      )}
    </div>
  );
};

const TableHead = () => (
  <thead>
    <tr className="relative border-b h-fit p-0 border-orange-300/50">
      <th
        className="bg-white sticky left-0 text-left text-[#242424] w-[120px] md:w-[160px]"
        scope="col"
      >
        <p className="border-r px-2 sm:px-[0.7ren] py-[14px] sm:py-[0.7rem] text-sm sm:text-base md:text-white md:bg-orange-600/90  border-orange-300/50">
          # shipment
        </p>
      </th>
      <th scope="col" className="text-[#242424] min-w-[120px]">
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          Client Name
        </p>
      </th>
      <th scope="col" className="text-[#242424] min-w-[120px]">
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          Client Email
        </p>
      </th>
      <th scope="col" className="text-[#242424] text-center min-w-[120px]">
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          Country
        </p>
      </th>
      <th scope="col" className="text-[#242424] text-center min-w-[120px]">
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          Card Details
        </p>
      </th>
      <th
        scope="col"
        className="text-[#242424] text-center bg-white h-full min-w-[80px] md:min-w-[120px]"
      >
        <p className="px-4 py-[0.8rem] flex items-center justify-center">
          <Table2Icon className="w-5 h-5 hover:text-[#242424c5]" />
        </p>
      </th>
    </tr>
  </thead>
);

interface RowData {
  trackingId: string;
  cName: string;
  cEmail?: string;
  cCountry: string;
  setShipments: React.Dispatch<React.SetStateAction<TShipments>>;
}
const TableData = ({
  trackingId,
  cName,
  cEmail,
  cCountry,
  setShipments,
}: RowData) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const axios = useAxiosPrivate();

  const deleteShipment = async (trackingId: string) => {
    setIsDeleting(true);

    try {
      const { data } = await axios.delete(`/shipment/${trackingId}`);
      toast.success(data?.message);

      const res = await axios(`/shipment`, {
        withCredentials: true,
      });

      setShipments(res?.data?.data?.allShipment);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr
      style={{ opacity: isDeleting ? "0.3" : "1" }}
      className="relative border-b border-orange-300/50 last:border-none"
    >
      <th
        className="bg-white sticky left-0 text-left w-[140px] md:w-[160px] hover:bg-[#f8f7f78c]"
        scope="row"
      >
        <p className=" border-r px-2 sm:px-[0.7rem] py-[14px] sm:py-[0.7rem] text-slate-800 text-sm sm:text-base md:text-white md:bg-orange-600/90  border-orange-300/50">
          {trackingId ?? 12345678}
        </p>
      </th>

      <td className="min-w-[120px] hover:bg-[#f8f7f78c]">
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          {cName ?? "James Bond"}
        </p>
      </td>

      <td
        className="min-w-[120px] hover:bg-[#f8f7f78c]"
        style={!cEmail ? { opacity: "0.7" } : {}}
      >
        <p
          className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base"
          style={{ textTransform: "initial" }}
        >
          {cEmail ? cEmail : "Unavailable"}
        </p>
      </td>

      <td
        className="min-w-[120px] text-center hover:bg-[#f8f7f78c]"
        style={!cCountry || cCountry === "none" ? { opacity: "0.7" } : {}}
      >
        <p className="px-2 sm:px-[0.7rem] py-[10px] sm:py-[0.7rem] text-sm sm:text-base">
          {!cCountry || cCountry === "none" ? "Unavailable" : cCountry}
        </p>
      </td>

      <td className="min-w-[20px] h-full bg-white hover:bg-[#f8f7f78c]">
        <p className="flex gap-x-[12px] items-center justify-center border-l border-orange-300/50 px-[8px] sm:px-[0.3rem] py-[14px] sm:py-[0.7rem] h-full">
          <Link to={`/dashboard/shipment/edit/${trackingId}`}>
            <PencilLine className="w-4 h-4 cursor-pointer text-black/30 hover:text-black" />
          </Link>
          <Trash2
            onClick={() => deleteShipment(trackingId)}
            className="w-4 h-4 cursor-pointer text-black/30 hover:text-red-600"
          />
        </p>
      </td>
    </tr>
  );
};
