import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries } from "countries-list";
import { toast } from "sonner";
import {
  Circle,
  Copy,
  HelpCircle,
  Loader2,
  PackageOpen,
  PencilLine,
  PlusCircle,
  RefreshCcw,
  Trash2,
} from "lucide-react";

import {
  isEventErrors,
  useShipmentForm,
  useShipmentInputsValidation,
} from "../../../sdk";

import { cn } from "../../../lib/utils";

import { Button, EventModal, ToolTip } from "../../../components";

export const ShipmentForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    states: {
      shipment: { belongsTo, destination, events, origin, status, trackingId },
      isSubmitting,
      shipmentEvent,
      whatToDo,
      isModalOpen,
    },
    actions: {
      canShipmentBeSubmitted,
      deleteEvent,
      handleFormChange,
      handleShipmentSubmission,
      refreshNumber,
      handleEventSubmission,
      handleShipmentEventChange,
      setShipmentEvent,
      openModal,
      closeModal,
    },
  } = useShipmentForm();

  const modalProps = {
    closeModal,
    setShipmentEvent,
    handleEventSubmission,
    handleShipmentEventChange,
    whatToDo,
    shipmentEvent,
  };

  // List of all countries
  const countriesOptions = Object.values(countries).map(
    (country) => country.name
  );

  // function and state returned by the hook are used for inputs validation on blur
  const { handleBlur, shipmentErrors } = useShipmentInputsValidation();

  // show the bill input only when shipment status is seized
  const [showBill, setShowBill] = useState<boolean>(false);
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (statusRef.current?.value === "seized") {
      setShowBill(true);
    } else {
      setShowBill(false);
    }
  }, [statusRef.current?.value]);

  if (!isMounted) return null;
  return (
    <form onSubmit={(e) => handleShipmentSubmission(e)} className="w-full ">
      <p className="flex items-center whitespace-nowrap mb-8 text-sm text-slate-600">
        <HelpCircle className="mr-2 h-4 w-4 text-orange-500" /> Shipment must
        have at least one event.
      </p>
      {/* cdet */}
      <div className="flex flex-col">
        <h1 className="font-bold text-orange-800/95 uppercase text-md">
          Client Details
        </h1>
        <div
          className="p-4 flex flex-col mb-8 gap-y-2 sm:gap-y-4"
          style={{ rowGap: "1rem" }}
        >
          <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-10">
            <p
              className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 "
              style={{ rowGap: "0.5rem" }}
            >
              <label htmlFor="name">Full&nbsp;Name:</label>

              <input
                onBlur={(e) => handleBlur(e)}
                type="text"
                name="fullName"
                id="name"
                value={belongsTo.fullName}
                onChange={(e) => handleFormChange(e)}
                className={cn(
                  "w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.fullName.showValidationWarning &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              />
            </p>

            {/* email */}
            <p
              className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 "
              style={{ rowGap: "0.5rem" }}
            >
              <label htmlFor="email">Email:</label>

              <input
                type="text"
                name="email"
                id="email"
                value={belongsTo.email}
                className="w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75"
                required
                aria-required
                onChange={(e) => handleFormChange(e)}
              />
            </p>
          </div>
          {/* country */}
          <div
            className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-12 mb-b"
            style={{ rowGap: "0.5rem" }}
          >
            <p className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 ">
              <label htmlFor="country">Country:</label>
              <select
                onChange={(e) => handleFormChange(e)}
                aria-label="Select your country"
                required
                value={belongsTo.country}
                name="country"
                id="country"
                className="w-full p-2 outline-none border border-orange-200/80 appearance-none rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 "
              >
                <option value="none"></option>

                {countriesOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </p>
            <div
              className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800"
              style={{ rowGap: "0.5rem" }}
            />
          </div>
        </div>
      </div>
      {/* cdet */}

      {/* shipment details */}
      <div className="flex flex-col">
        <h1 className="font-bold text-orange-800/95 uppercase text-md mb-4">
          Shipment Details
        </h1>

        <div className="bg-orange-700/95 px-4 py-2 flex justify-between items-center border-2 border-amber-500/95">
          <p className="text-white font-medium text-sm flex items-center gap-x-2">
            <ToolTip description="Refresh tracking number">
              <button type="button" onClick={refreshNumber}>
                <RefreshCcw className="text-amber-300 h-6 w-6" />
              </button>
            </ToolTip>
            Tracking Number: <span>{trackingId}</span>
          </p>
          <CopyToClipboard
            text={trackingId}
            onCopy={() => {
              toast.success("Copied to clipboard");
            }}
          >
            <button type="button">
              <Copy className="text-white h-6 w-6 cursor-pointer" />
            </button>
          </CopyToClipboard>
        </div>

        <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-8 mt-8 gap-x-8">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="font-bold text-orange-800/95 uppercase text-sm mb-4">
              Addresses
            </h1>

            {/* add events to this continer */}
            <div className="flex flex-col gap-y-4 p-4">
              <p className="flex-1 flex flex-col  sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
                <label htmlFor="origin" className="whitespace-nowrap">
                  Origin Address:
                </label>

                <input
                  onBlur={(e) => handleBlur(e)}
                  type="text"
                  name="originAddress"
                  id="origin"
                  value={origin.address.addressLocality}
                  onChange={(e) => handleFormChange(e)}
                  className={cn(
                    "w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                    !isEventErrors(shipmentErrors) &&
                      shipmentErrors.originAddress.showValidationWarning &&
                      "outline-2 outline-red-400"
                  )}
                  required
                  aria-required
                />
              </p>

              {/* destination address */}
              <p className="flex-1 flex flex-col sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
                <label htmlFor="destination" className="whitespace-nowrap">
                  Destination Address:
                </label>

                <input
                  onBlur={(e) => handleBlur(e)}
                  type="text"
                  name="destinationAddress"
                  id="destination"
                  value={destination.address.addressLocality}
                  onChange={(e) => handleFormChange(e)}
                  className={cn(
                    "w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                    !isEventErrors(shipmentErrors) &&
                      shipmentErrors.destinationAddress.showValidationWarning &&
                      "outline-2 outline-red-400"
                  )}
                  required
                  aria-required
                />
              </p>
            </div>
            <div className="flex flex-col mt-8">
              <h1 className="font-bold text-orange-800/95 uppercase text-sm mb-4 flex justify-between gap-6 items-center">
                <span>Shipment Events</span>
                <Button
                  className="bg-orange-700/95 border-2 border-amber-500/95 text-white hover:bg-transparent hover:text-orange-700/95 hover:border-orange-700/95"
                  type="button"
                  onClick={() => {
                    openModal("add");
                  }}
                  size={"sm"}
                >
                  <PlusCircle className="mr-[3px] h-5 w-5" />
                  Add Event
                </Button>
                {isModalOpen && <EventModal {...modalProps} />}
              </h1>
              {events.length ? (
                events.map((event, i) => (
                  <article
                    key={i}
                    className="py-2 mb-4 border-b border-orange-200/80   flex justify-between"
                  >
                    <p className="flex items-center">
                      <Circle className="h-2 w-2 text-orange-700/95 mr-[6px]" />
                      {event.description.length <= 40
                        ? event.description
                        : event.description.slice(0, 40).trim() + "..."}
                    </p>
                    <div className="flex items-center gap-x-[8px]">
                      <button
                        className="bg-transparent outline-none border-none"
                        title="Edit event"
                        onClick={() => openModal("edit", event.eventId!)}
                        type="button"
                      >
                        <PencilLine className="mr-[3px] h-4 w-4 text-slate-700" />
                      </button>
                      <button
                        title="Delete event"
                        onClick={() => deleteEvent(event.eventId)}
                        className="bg-transparent border-none outline-none"
                      >
                        <Trash2 className="ml-[3px] h-4 w-4 text-slate-700" />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="mt-12 grid place-items-center text-muted-foreground/75 text-sm">
                  <PackageOpen className="text-orange-400/80" />
                  <span>No events added yet</span>
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div
            className="flex flex-col w-full md:w-1/2 gap-y-4 p-4"
            style={{ rowGap: "1rem" }}
          >
            <h1 className="font-bold text-orange-800/95 uppercase text-sm">
              Delivery status
            </h1>

            <p className="flex-1 flex flex-row md:flex-row lg:items-center w-full gap-2 text-sm font-medium text-neutral-800 items-center  md:items-center">
              <label htmlFor="timestamp">Timestamp:</label>
              <input
                onBlur={(e) => handleBlur(e)}
                type="datetime-local"
                name="statusTimestamp"
                id="timestamp"
                value={status.timestamp}
                onChange={(e) => handleFormChange(e)}
                className={cn(
                  "w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.deliveryTimestamp.showValidationWarning &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              />
            </p>

            {/* location */}
            <p className="flex-1 flex flex-col  sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
              <label htmlFor="location">Location:</label>
              <input
                onBlur={(e) => handleBlur(e)}
                type="text"
                name="statusLocationAddress"
                id="location"
                value={status.location.address.addressLocality}
                onChange={(e) => handleFormChange(e)}
                className={cn(
                  "w-full p-2 outline-none border border-orange-200/80 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.deliveryLocation.showValidationWarning &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              />
            </p>

            {/* description */}
            <p className="flex-1 flex flex-col  sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
              <label htmlFor="description">Description:</label>
              <textarea
                onBlur={(e) => handleBlur(e)}
                name="statusDescription"
                id="description"
                value={status.description}
                onChange={(e) => handleFormChange(e)}
                className={cn(
                  "w-full p-2 outline-none border border-orange-200/80 min-h-[6rem] max-w-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.deliveryDescription.showValidationWarning &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              ></textarea>
            </p>

            {/* status status */}
            <p className="flex-1 w-full gap-x-2 capitalize flex text-sm font-medium text-neutral-800 items-center">
              <label htmlFor="status">status:</label>
              <select
                name="status"
                id="status"
                onChange={(e) => handleFormChange(e)}
                value={status.status}
                ref={statusRef}
                className="p-2 outline-none border border-orange-200/80 max-w-fit appearance-none rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75"
              >
                <option value="pending">Pending</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="seized">Seized</option>
              </select>
            </p>

            {/* Bill */}
            <p
              className={cn(
                "hidden flex-1 w-full gap-x-2 capitalize  text-sm font-medium text-neutral-800 items-center",
                showBill && "flex"
              )}
            >
              <label htmlFor="bill">Bill:</label>
              <input
                type="number"
                name="bill"
                id="bill"
                value={status.bill as number}
                onChange={(e) => handleFormChange(e)}
                className="p-2 outline-none border border-orange-200/80 max-w-fit rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/75 hide-scroll"
              />
              <strong>$</strong>
            </p>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div className="mt-48 flex justify-center items-center">
        <Button
          type="submit"
          disabled={isSubmitting ? true : !canShipmentBeSubmitted()}
          className="bg-orange-700/95 border-2 border-amber-500/95 text-white hover:bg-transparent hover:text-orange-700/95 hover:border-orange-700/95 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Create Shipment</span>
          )}
        </Button>
      </div>
    </form>
  );
};
