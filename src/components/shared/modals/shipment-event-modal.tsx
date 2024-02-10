import { v4 as EventId } from "uuid";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import {
  TEvent,
  isEventErrors,
  resetErrors,
  useShipmentEventsInputValidation,
} from "../../../sdk";
import { cn } from "../../../lib/utils";

import { Button } from "../../ui";
import { X } from "lucide-react";

interface EventProps {
  shipmentEvent: TEvent;
  whatToDo: "edit" | "add";
  handleEventSubmission: () => void;
  closeModal: () => void;
  setShipmentEvent: Dispatch<SetStateAction<TEvent>>;
  handleShipmentEventChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const EventModal = ({
  closeModal,
  handleEventSubmission,
  handleShipmentEventChange,
  setShipmentEvent,
  shipmentEvent,
  whatToDo,
}: EventProps) => {
  // When modal mounts and its function is to add a new event (i.e. whatToDo==="add"), then assign a "eventId" to the new event already
  useEffect(() => {
    let isMounted = true;

    isMounted &&
      whatToDo === "add" &&
      setShipmentEvent((prevEvent) => ({
        ...prevEvent,
        eventId: EventId(),
      }));

    return () => {
      isMounted = false;
    };
  }, [setShipmentEvent, whatToDo]);
  // input validation
  const {
    handleEventInputBlur,
    canEventBeSubmitted,
    eventErrors,
    setEventErrors,
  } = useShipmentEventsInputValidation();

  // On mount, enable button if the function of the modal is to edit an event
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (whatToDo === "edit") {
        resetErrors(setEventErrors, eventErrors);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [setEventErrors, whatToDo]);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="fixed left-[50%] top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px] w-[90%]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="text-lg font-semibold leading-none tracking-tight flex justify-between items-center gap-8">
            {whatToDo === "add" ? "Add Event" : "Edit Event"}
            <button
              onClick={closeModal}
              className="bg-none outline-none bg-transparent border-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-[12px] capitalize mt-2 text-muted-foreground font-thin">
            {whatToDo === "add" ? " Add to" : "Edit"} your shipment events here.
            Click save when you're done.
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="flex-1 flex flex-col w-full gap-2 text-sm font-medium text-neutral-800 items-start">
            <label className="font-sm capitalize" htmlFor="eventTimestamp">
              Timestamp:
            </label>
            <input
              onBlur={(e) => handleEventInputBlur(e)}
              type="datetime-local"
              name="timestamp"
              id="eventTimestamp"
              value={shipmentEvent.timestamp}
              onChange={(e) => handleShipmentEventChange(e)}
              className={cn(
                "w-full p-2 outline-none border border-orange-200/80 max-w-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                isEventErrors(eventErrors) &&
                  eventErrors.timestamp.showValidationWarning &&
                  "outline-2 outline-red-400"
              )}
              required
              aria-required
              autoFocus={false}
            />
          </p>
          <p className="flex-1 flex flex-col w-full gap-2 text-sm font-medium text-neutral-800 items-start">
            <label className="font-sm capitalize" htmlFor="eventLocation">
              Location:
            </label>

            <input
              onBlur={(e) => handleEventInputBlur(e)}
              type="text"
              name="eventLocationAddress"
              id="eventLocation"
              value={shipmentEvent.location.address.addressLocality}
              onChange={(e) => handleShipmentEventChange(e)}
              className={cn(
                "w-full p-2 outline-none border border-orange-200/80 max-w-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                isEventErrors(eventErrors) &&
                  eventErrors.location.showValidationWarning &&
                  "outline-2 outline-red-400"
              )}
              required
              aria-required
              autoFocus={false}
            />
          </p>
          <p className="flex-1 flex flex-col w-full gap-2 text-sm font-medium text-neutral-800 items-start">
            <label className="font-sm capitalize" htmlFor="eventDescription">
              Description:
            </label>

            <textarea
              onBlur={(e) => handleEventInputBlur(e)}
              name="description"
              id="eventDescription"
              value={shipmentEvent.description}
              onChange={(e) => handleShipmentEventChange(e)}
              className={cn(
                "w-full p-2 outline-none border border-orange-200/80 min-h-[6rem] max-w-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                isEventErrors(eventErrors) &&
                  eventErrors.description.showValidationWarning &&
                  "outline-2 outline-red-400"
              )}
              required
              aria-required
              autoFocus={false}
            ></textarea>
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button
            disabled={canEventBeSubmitted}
            size={"sm"}
            onClick={handleEventSubmission}
            type="button"
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
