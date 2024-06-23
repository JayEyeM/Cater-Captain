
//Create Event interface
export interface Event {
    EventName: string;
    CustomerFirstName: string;
    CustomerLastName: string;
    CustomerPhoneNumber: number;
    CustomerEmail: string;
    EventType: string;
    NumberOfGuests: number;
    EventDate: string;
    StartTime: string;
    EndTime: string;
    VenueName: string;
    VenueStreetAddress: string;
    VenueCity: string;
    id: number;
    ingredients: Ingredient[];
    menuItems?: string[];
    notes?: Notes[];
    pricing?: Pricing[];
    imageUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
}

//Create interface for EventForm
export interface EventForm {
    EventName: string;
    CustomerFirstName: string;
    CustomerLastName: string;
    CustomerPhoneNumber: number;
    CustomerEmail: string;
    EventType: string;
    NumberOfGuests: number;
    EventDate: string;
    StartTime: string;
    EndTime: string;
    VenueName: string;
    VenueStreetAddress: string;
    VenueCity: string;
    id: number;
    ingredients: Ingredient[];
    menuItems?: string[];
    notes?: Notes[];
}

//Create interface for ViewSavedEvents
export interface ViewSavedEvents {
    savedEvents: EventForm[];
}

//Create interface for EditEventForm
export interface EditEventForm {
    EventName: string;
    CustomerFirstName: string;
    CustomerLastName: string;
    CustomerPhoneNumber: number;
    CustomerEmail: string;
    EventType: string;
    NumberOfGuests: number;
    EventDate: string;
    StartTime: string;
    EndTime: string;
    VenueName: string;
    VenueStreetAddress: string;
    VenueCity: string;
    id: number;
}

//Create interface for SortEvents
export interface SortEvents {
    startDate: string;
    endDate: string;
}

// ingredient interface
export interface Ingredient {
  name: string;
  units: string;
  quantity: number;
  onHand: boolean;
  needToOrder: boolean;
}

//create interface for Notes
export interface Notes {
  notes: string;
}

export interface Pricing {
  name: string;
  price: number;
  currency: string;
}

//create interface for InventoryItem
export interface InventoryItem {
    id: string;
    name: string;
    amountPerUnit: number;
    unit: string;
    quantity: number;
    whenToOrder: number;
    costPerUnit: number;
    sku: string;
    packageType: string;
    supplierName: string;
  }