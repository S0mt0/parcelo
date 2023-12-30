import { Dispatch, SetStateAction } from "react";
import { EventErrors, ShipmentErrors } from "../../../sdk";

// Type guard function
export const isValidDate = (value: any): value is Date => {
  return value instanceof Date || !isNaN(value);
};

// Type guard function
export const isEventErrors = (
  errors: EventErrors | ShipmentErrors
): errors is EventErrors => {
  return Object.keys(errors).includes("location");
};

export const checkValidation = (
  name: string,
  showValidationWarning: boolean,
  setErrors: Dispatch<SetStateAction<EventErrors | ShipmentErrors>>
) => {
  setErrors((prevErrors: EventErrors | ShipmentErrors) => {
    if (isEventErrors(prevErrors)) {
      return {
        ...prevErrors,
        [name]: {
          ...prevErrors[name as keyof EventErrors],
          showValidationWarning,
        },
      };
    }

    return {
      ...prevErrors,
      [name]: {
        ...prevErrors[name as keyof ShipmentErrors],
        showValidationWarning,
      },
    };
  });
};

// Resetting errors
export const resetErrors = (
  setErrors: Dispatch<SetStateAction<EventErrors | ShipmentErrors>>,
  errors: EventErrors | ShipmentErrors
) => {
  if (isEventErrors(errors)) {
    setErrors({
      location: {
        showValidationWarning: false,
      },
      description: {
        showValidationWarning: false,
      },
      timestamp: {
        showValidationWarning: false,
      },
    });
  } else {
    setErrors({
      fullName: {
        showValidationWarning: false,
      },
      email: {
        showValidationWarning: false,
      },
      originAddress: {
        showValidationWarning: false,
      },
      destinationAddress: {
        showValidationWarning: false,
      },
      deliveryTimestamp: {
        showValidationWarning: false,
      },
      deliveryLocation: {
        showValidationWarning: false,
      },
      deliveryDescription: {
        showValidationWarning: false,
      },
    });
  }
};

export const isEmailValid = (email: string): boolean => {
  // Regular expression for validating an Email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};
