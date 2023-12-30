import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  EventErrors,
  ShipmentErrors,
  eventErrorsInitState,
  isValidDate,
  checkValidation,
  shipmentErrorsInitState,
} from "../../../sdk";

export const useShipmentInputsValidation = () => {
  const [shipmentErrors, setShipmentErrors] = useState<
    ShipmentErrors | EventErrors
  >(shipmentErrorsInitState);

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case "fullName":
          if (value) {
            checkValidation("fullName", false, setShipmentErrors);
          } else {
            checkValidation("fullName", true, setShipmentErrors);
          }
          break;

        case "originAddress":
          if (value) {
            checkValidation("originAddress", false, setShipmentErrors);
          } else {
            checkValidation("originAddress", true, setShipmentErrors);
          }
          break;

        case "destinationAddress":
          if (value) {
            checkValidation("destinationAddress", false, setShipmentErrors);
          } else {
            checkValidation("destinationAddress", true, setShipmentErrors);
          }
          break;

        case "statusTimestamp":
          if (!value) {
            checkValidation("deliveryTimestamp", true, setShipmentErrors);
          } else if (isValidDate(value)) {
            checkValidation("deliveryTimestamp", true, setShipmentErrors);
          } else {
            checkValidation("deliveryTimestamp", false, setShipmentErrors);
          }
          break;

        case "statusLocationAddress":
          if (value) {
            checkValidation("deliveryLocation", false, setShipmentErrors);
          } else {
            checkValidation("deliveryLocation", true, setShipmentErrors);
          }
          break;

        case "statusDescription":
          if (value) {
            checkValidation("deliveryDescription", false, setShipmentErrors);
          } else {
            checkValidation("deliveryDescription", true, setShipmentErrors);
          }
          break;
      }
    },
    []
  );

  return {
    handleBlur,
    setShipmentErrors,
    shipmentErrors,
  };
};

// Events validaion
export const useShipmentEventsInputValidation = () => {
  const [eventErrors, setEventErrors] = useState<EventErrors | ShipmentErrors>(
    eventErrorsInitState
  );

  const handleEventInputBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case "eventLocationAddress":
          if (value) {
            checkValidation("location", false, setEventErrors);
          } else {
            checkValidation("location", true, setEventErrors);
          }
          break;

        case "timestamp":
          if (!value) {
            checkValidation("timestamp", true, setEventErrors);
          } else if (isValidDate(value)) {
            checkValidation("timestamp", true, setEventErrors);
          } else {
            checkValidation("timestamp", false, setEventErrors);
          }

          break;

        case "description":
          if (value) {
            checkValidation("description", false, setEventErrors);
          } else {
            checkValidation("description", true, setEventErrors);
          }
          break;
      }
    },
    []
  );

  const canEventBeSubmitted = useMemo(() => {
    return Object.values(eventErrors).every(
      (error) => error.showValidationWarning === false
    );
  }, [eventErrors]);

  return {
    handleEventInputBlur,
    canEventBeSubmitted,
    eventErrors,
    setEventErrors,
  };
};
