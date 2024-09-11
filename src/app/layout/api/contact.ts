export interface GetContactRequest {
    id: string;  // UUID format
  }

  
  export interface GetContactResponse {
    id: string;           // UUID
    name: string;         // Assumed contact name
    email: string;        // Assumed email
    phone?: string;       // Assumed optional phone number
    message?: string;     // Assumed optional message
  }

  export interface CreateContactCommand {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }

  export interface CreateContactResponse {
    success: boolean;
    id: string;             // ID of the created contact
    message?: string;       // Optional success message
  }

  export interface UpdateContactCommand {
    id: string;             // UUID of the contact to update
    name: string;           // Updated name
    email: string;          // Updated email
    phone?: string;         // Updated phone number
    message?: string;       // Updated message
  }

  export interface UpdateContactResponse {
    success: boolean;
    message?: string;       // Optional success message
  }

  export interface DeleteContactCommand {
    id: string;  // UUID of the contact to delete
  }

  export interface DeleteContactResponse {
    success: boolean;
    message?: string;       // Optional success message
  }

  export interface GetAllContactQuery {
    query?: string;         // Optional search query
  }

  export interface GetAllContactResponse {
    success: boolean;
    data: {
      id: string;           // UUID of each contact
      name: string;         // Name of each contact
      email: string;        // Email of each contact
      phone?: string;       // Optional phone number for each contact
      message?: string;     // Optional message for each contact
    }[];
    totalRecords: number;   // Total number of contact records
  }
  