import { EnumResponse } from "./enum";

export interface ContactResponse {
  type: EnumResponse;
  value: string; 
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  id: string;
}

export interface CreateContactCommand {
  type: number; 
  value: string;
}

export interface UpdateContactCommand {
  id: string;
  type: number;
  value: string;
}

export interface DeleteContactCommand {
  id: string;
}
