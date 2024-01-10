import { EventErrors, ShipmentErrors, TEvent, TShipment } from "../../sdk";

export const shipmentInitState: TShipment = {
  belongsTo: {
    fullName: "",
    email: "",
    country: "",
    checkout: false,
  },

  trackingId: "",

  origin: {
    address: {
      addressLocality: "",
    },
  },

  destination: {
    address: {
      addressLocality: "",
    },
  },

  status: {
    timestamp: "",

    location: {
      address: {
        addressLocality: "",
      },
    },

    status: "pending",

    description: "",

    bill: "",
  },
  events: [],
};

export const shipmentEventInitState: TEvent = {
  eventId: "",

  timestamp: "",

  location: {
    address: {
      addressLocality: "",
    },
  },

  description: "",
};

export const eventErrorsInitState: EventErrors = {
  location: {
    showValidationWarning: false,
  },

  description: {
    showValidationWarning: false,
  },

  timestamp: {
    showValidationWarning: false,
  },
};

export const shipmentErrorsInitState: ShipmentErrors = {
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
};
