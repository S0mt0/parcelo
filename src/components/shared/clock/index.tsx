import { Clock10 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedTime = useMemo(
    () =>
      time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    [time]
  );

  const hours = formattedTime.split(":")[0];
  const minutes = formattedTime.split(":")[1];
  const seconds = formattedTime.split(":")[2].split(" ")[0];
  const offset = formattedTime.split(":")[2].split(" ")[1];
  return (
    <div className="flex gap-x-3 items-center">
      <Clock10 className="text-orange-600 h-5 w-5" />
      <div className="grid grid-cols-4 font-medium text-sm">
        <h3>{hours}:</h3>
        <h3>{minutes}:</h3>
        <h3>{seconds}</h3>
        <h3>{offset}</h3>
      </div>
    </div>
  );
};
