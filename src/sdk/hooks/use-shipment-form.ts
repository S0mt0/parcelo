import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  ShipmentErrors,
  TEvent,
  TEvents,
  TShipment,
  changeToLocalDatetime,
  generateRandomNumbers,
  shipmentEventInitState,
  shipmentInitState,
  useAxiosPrivate,
  useShipmentInputsValidation,
} from "../../sdk";

export const useShipmentForm = (
  mode: "add" | "edit",
  shipmentPayload?: TShipment | null
) => {
  const [shipment, setShipment] = useState<TShipment>(shipmentInitState);
  const axios = useAxiosPrivate();

  // When component mounts and mode is "add", generate a new random trackingId number and assign to shipment trackingId prop
  useEffect(() => {
    let isMounted = true;
    const { code } = generateRandomNumbers(10);

    isMounted &&
      mode === "add" &&
      setShipment((prevShipment) => ({
        ...prevShipment,
        trackingId: code,
      }));

    return () => {
      isMounted = false;
    };
  }, [mode]);

  // function to refresh or generate new tracking numbers if needed
  const refreshNumber = () => {
    const { code } = generateRandomNumbers(10);

    setShipment((prevShipment) => ({
      ...prevShipment,
      trackingId: code,
    }));
  };

  // Set shipment with payload if mode is "edit"
  useEffect(() => {
    let isMounted = true;
    /** Before committing shipment to state, reformat time to avoid format descripancies, warnings, and potential bugs. Essentially timestamp format returned from database includes seconds, whereas in the datetime-local input type, the seconds is optional/not-included. So filling such inputs with values that are not supported causes some issues. Example, from datetime-local input type, we return '2023-10-21T15:47' format, whereas, from database, we return ISOString e.g '2023-10-21T15:48:13.959Z' */
    const formattedShipEvents: TEvents | undefined =
      shipmentPayload?.events &&
      shipmentPayload?.events.map((event: TEvent) => {
        return {
          ...event,
          timestamp: changeToLocalDatetime(event.timestamp),
        };
      });

    const formattedShipment: TShipment | null | undefined = shipmentPayload &&
      formattedShipEvents && {
        ...shipmentPayload,
        status: {
          ...shipmentPayload?.status,
          timestamp: changeToLocalDatetime(shipmentPayload.status.timestamp),
        },
        events: formattedShipEvents,
      };

    isMounted &&
      mode === "edit" &&
      formattedShipment &&
      setShipment(formattedShipment);

    return () => {
      isMounted = false;
    };
  }, [shipmentPayload, mode]);

  // handle subsequent form change events
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const { name, value } = e.target;

    switch (name) {
      case "fullName":
      case "email":
      case "country":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          belongsTo: { ...prevShipment.belongsTo, [name]: value },
        }));

      case "originAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          origin: {
            ...prevShipment.origin,
            address: {
              ...prevShipment.origin.address,
              addressLocality: value,
            },
          },
        }));

      case "destinationAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          destination: {
            ...prevShipment.destination,
            address: {
              ...prevShipment.destination.address,
              addressLocality: value,
            },
          },
        }));

      case "statusTimestamp":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, timestamp: value },
        }));

      case "statusLocationAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: {
            ...prevShipment.status,
            location: {
              ...prevShipment.status.location,
              address: {
                ...prevShipment.status.location.address,
                addressLocality: value,
              },
            },
          },
        }));

      case "status":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: {
            ...prevShipment.status,
            status: value as "pending" | "shipping" | "delivered" | "seized",
          },
        }));

      case "statusDescription":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, description: value },
        }));

      case "bill":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, bill: +value },
        }));

      default:
        return setShipment((prevShipment) => ({
          ...prevShipment,
          [name]: value,
        }));
    }
  };

  // form for shipment event section
  const [shipmentEvent, setShipmentEvent] = useState<TEvent>(
    shipmentEventInitState
  );

  const handleShipmentEventChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const { name, value } = e.target;

    switch (name) {
      case "eventLocationAddress":
        return setShipmentEvent((prevEvent) => ({
          ...prevEvent,
          location: {
            ...prevEvent.location,
            address: {
              ...prevEvent.location.address,
              addressLocality: value,
            },
          },
        }));

      default:
        return setShipmentEvent((prevEvent) => ({
          ...prevEvent,
          [name]: value,
        }));
    }
  };

  // state to determine what action the button on the modal should take, whether to edit an event or to add a new one
  const [whatToDo, setWhatToDo] = useState<"add" | "edit">("add");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
    // clear modal content before closing so that when modal opens again, it doesn't open prefilled with an event data
    setShipmentEvent(shipmentEventInitState);
  };

  const openModal = (type: "add" | "edit" | undefined, eventId?: string) => {
    const allEvents = shipment.events;

    if (type === "add" || undefined) {
      setIsModalOpen(true);
      setWhatToDo("add");
    } else if (type === "edit") {
      setWhatToDo("edit");
      // load modal with the data for the event that is to be edited
      const foundEvent = allEvents.find((event) => event.eventId === eventId);

      foundEvent && setShipmentEvent(foundEvent);
      setIsModalOpen(true);
    }
  };

  // handle what happens when an event is submitted. Should it be edited or should it be added as new?
  const handleEventSubmission = () => {
    if (whatToDo === "add") {
      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...prevShipment.events, shipmentEvent],
      }));

      // closeModal();
      setShipmentEvent(shipmentEventInitState);
      toast.success("Event added successfully");
    } else {
      const filteredEvents = shipment.events.filter(
        (event) => event.eventId !== shipmentEvent.eventId
      );

      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...filteredEvents, { ...shipmentEvent }],
      }));

      closeModal();
      toast.success("Event modified successfully");
    }
  };

  // delete single event
  const deleteEvent = useCallback(
    (eventId: string) => {
      const allEvents = shipment.events;

      // filter out unwanted event
      const filteredEvents = allEvents.filter((event) => {
        return event.eventId !== eventId;
      });

      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...filteredEvents],
      }));
    },
    [shipment.events]
  );

  // check for shipment form validity
  const { shipmentErrors } = useShipmentInputsValidation();

  const canShipmentBeSubmitted = useCallback(() => {
    return (
      Object.values(shipmentErrors as ShipmentErrors).every(
        (error) => error.showValidationWarning === false
      ) &&
      Boolean(shipment.events.length) &&
      Boolean(shipment.trackingId)
    );
  }, [shipment.events.length, shipment.trackingId, shipmentErrors]);

  // form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  // handle form submission
  const handleShipmentSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { data } =
        mode === "add"
          ? await axios.post("/shipment", shipment, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
          : await axios.patch(`/shipment/${shipment?.trackingId}`, shipment, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });

      toast.success(data?.message);
      setShipment(shipmentInitState);
      navigate("/dashboard/shipment");
    } catch (error: any) {
      toast.error(error?.response?.data?.data?.validation_error_message);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    states: {
      shipment,
      shipmentEvent,
      isSubmitting,
      whatToDo,
      isModalOpen,
    },

    actions: {
      handleFormChange,
      handleShipmentEventChange,
      handleEventSubmission,
      handleShipmentSubmission,
      refreshNumber,
      deleteEvent,
      setShipmentEvent,
      canShipmentBeSubmitted,
      openModal,
      closeModal,
    },
  };
};
