import { EnumResponse } from "./enum";

export interface UserResponse {
    firstnameEn: string;
    firstnameRu: string;
    lastnameEn: string;
    lastnameRu: string;
    gender: EnumResponse;
    userrole: EnumResponse;
    phone1: string;
    phone2: string;
    email: string;
    photo?: string | null;
    id: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }

  export interface CreateUserRequest {
   firstnameEn: string;      // First name in English
   firstnameRu: string;      // First name in Russian
   lastnameEn: string;       // Last name in English
   lastnameRu: string;       // Last name in Russian
   gender: EnumResponse;           // Gender enum (male/female/other)
   userrole: EnumResponse;       // User role enum (admin/user/...)
   phone1?: string;          // Primary phone number
   phone2?: string;          // Secondary phone number
   email: string;            // Email address
   password: string;         // User's password
   photo?: File;             // User's profile photo as a binary file
 }

 export interface UpdateUserRequest {
   id: string;               // UUID of the user to update
   firstnameEn?: string;      // First name in English
   firstnameRu?: string;      // First name in Russian
   lastnameEn?: string;       // Last name in English
   lastnameRu?: string;       // Last name in Russian
   gender?: EnumResponse;           // Gender enum (male/female/other)
   userrole?: EnumResponse;       // User role enum (admin/user/...)
   phone1?: string;           // Primary phone number
   phone2?: string;           // Secondary phone number
   email?: string;            // Email address
   password?: string;         // New password
   confirmPassword?: string;  // Confirm new password
   oldPassword?: string;      // Old password for validation
   photo?: File;              // User's profile photo as a binary file
 }

 export interface DeleteUserRequest {
   id: string;               // UUID of the user to delete
 }
 
 
 
 