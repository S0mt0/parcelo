export const SHIPMENT_FORM_VALIDATION_MESSAGES = {
  // Shipment event validation messages
  Event_Location: "Event address is required.",
  Event_Timestamp: "Provide a timestamp for event.",
  Event_Description: "A description for the event is required.",

  //
  Description_Too_Short: "Description should not be less than 10 characters.",
  Invalid_Date: "Invalid date.",

  // Shipment validation messages
  Client_FullName: "Client's full name is required.",
  Client_Email_Invalid: "Invalid email address.",
  Tracking_ID: "Each shipment must have a unique tracking number.",
  Origin_Address: "Origin address is required.",
  Destination_Address: "Destination address is required.",
  Delivery_Timestamp: "Timestamp of shipment status is required.",
  Delivery_Address: "Shipment delivery address is required.",
  Delivery_Status: "Choose a delivery status.",
  Shipment_Events: "Shipment must have atleast one event.",
  Delivery_Description: "A description about the delivery status is required.",
};
