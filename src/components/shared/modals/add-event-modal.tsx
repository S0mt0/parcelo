import { v4 as EventId } from "uuid";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { PlusCircle } from "lucide-react";

import {
  TEvent,
  isEventErrors,
  useShipmentEventsInputValidation,
} from "../../../sdk";

import { cn } from "../../../lib/utils";

import { Button } from "../../../components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components";

export function AddEventModal(props: {
  shipmentEvent: TEvent;
  whatToDo: "edit" | "add";
  resetEventModal: () => void;
  handleEventSubmission: () => void;
  setShipmentEvent: Dispatch<SetStateAction<TEvent>>;
  handleShipmentEventChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  toggleMode: (type: "add" | "edit", eventId?: string) => void;
}) {
  /** When modal mounts and its function is to add a new event (i.e. whatToDo==="add"), then assign a "eventId" to the new event already */
  useEffect(() => {
    let isMounted = true;
    const eventId = EventId();

    isMounted &&
      props.whatToDo === "add" &&
      props.setShipmentEvent((prevEvent) => ({
        ...prevEvent,
        eventId,
      }));

    return () => {
      isMounted = false;
    };
  }, [props.whatToDo]);

  // input validation
  const { handleEventInputBlur, canEventBeSubmitted, eventErrors } =
    useShipmentEventsInputValidation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-orange-700/95 border-2 border-amber-500/95 text-white hover:bg-transparent hover:text-orange-700/95 hover:border-orange-700/95"
          onClick={() => props.toggleMode("add")}
          size={"sm"}
        >
          <PlusCircle className="mr-[3px] h-5 w-5" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] w-[90%]"
        resetEventModal={props.resetEventModal}
      >
        <DialogHeader>
          <DialogTitle>Add Event </DialogTitle>
          <DialogDescription>
            Add to your shipment events here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <p className="flex-1 flex flex-col w-full gap-2 text-sm font-medium text-neutral-800 items-start">
            <label htmlFor="eventTimestamp">Timestamp:</label>
            <input
              onBlur={(e) => handleEventInputBlur(e)}
              type="datetime-local"
              name="timestamp"
              id="eventTimestamp"
              value={props.shipmentEvent.timestamp}
              onChange={(e) => props.handleShipmentEventChange(e)}
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
            <label htmlFor="eventLocation">Location:</label>

            <input
              onBlur={(e) => handleEventInputBlur(e)}
              type="text"
              name="eventLocationAddress"
              id="eventLocation"
              value={props.shipmentEvent.location.address.addressLocality}
              onChange={(e) => props.handleShipmentEventChange(e)}
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
            <label htmlFor="eventDescription">Description:</label>

            <textarea
              onBlur={(e) => handleEventInputBlur(e)}
              name="description"
              id="eventDescription"
              value={props.shipmentEvent.description}
              onChange={(e) => props.handleShipmentEventChange(e)}
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
        <DialogFooter>
          <Button
            disabled={!canEventBeSubmitted}
            size={"sm"}
            onClick={props.handleEventSubmission}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
