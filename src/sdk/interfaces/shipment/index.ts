// single event
export type TEvent = {
  _id?: string;

  eventId: string;

  timestamp: string;

  location: {
    address: {
      addressLocality: string;
    };
  };

  description: string;
};

export type EventErrors = {
  location: {
    showValidationWarning: boolean;
  };
  timestamp: {
    showValidationWarning: boolean;
  };
  description: {
    showValidationWarning: boolean;
  };
};

// all shipment events
export type TEvents = TEvent[];

// single shipment
export type TShipment = {
  _id?: string;

  createdAt?: string;

  updatedAt?: string;

  __v?: string;

  belongsTo: {
    fullName: string;
    email: string;
    country: string;
  };

  trackingId: string;

  origin: {
    address: {
      addressLocality: string;
    };
  };

  destination: {
    address: {
      addressLocality: string;
    };
  };

  status: {
    timestamp: string;

    location: {
      address: {
        addressLocality: string;
      };
    };

    status: "pending" | "delivered" | "shipping";

    description: string;
  };

  events: TEvents;
};

// all shipments
export type TShipments = TShipment[] | [];

export type ShipmentErrors = {
  fullName: { showValidationWarning: boolean };

  email: { showValidationWarning: boolean };

  originAddress: {
    showValidationWarning: boolean;
  };

  destinationAddress: {
    showValidationWarning: boolean;
  };

  deliveryTimestamp: {
    showValidationWarning: boolean;
  };

  deliveryLocation: {
    showValidationWarning: boolean;
  };

  deliveryDescription: {
    showValidationWarning: boolean;
  };
};
