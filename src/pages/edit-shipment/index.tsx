import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TShipment, useAxiosPrivate } from "../../sdk";
import { ShipmentForm } from "./_components/shipment-form";

import { LoadingUI } from "../../components";

const EditShipmentPage = () => {
  const axios = useAxiosPrivate();
  const { id } = useParams();
  const [shipment, setShipment] = useState<TShipment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchShipment = async () => {
      setLoading(true);
      try {
        const { data } = await axios(`/shipment/${id}`, {
          withCredentials: true,
          signal: controller.signal,
        });

        isMounted && setShipment(data?.data?.shipment);
      } catch (error: any) {
        // toast.error(error?.response?.data?.success?.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axios, id]);

  if (loading) {
    return <LoadingUI />;
  }
  return (
    <div className=" min-h-screen py-12 px-4 sm:px-8 w-full">
      <div className="md:max-w-screen-lg mx-auto">
        <ShipmentForm shipment={shipment} />
      </div>
    </div>
  );
};

export default EditShipmentPage;
