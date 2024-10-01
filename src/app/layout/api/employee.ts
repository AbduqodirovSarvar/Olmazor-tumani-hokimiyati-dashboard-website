import { EmployeeCategory } from "./baseApi";
import { EnumResponse } from "./enum";

export interface EmployeeCreateRequest {
    FirstnameEn: string;
    FirstnameRu: string;
    LastnameEn: string;
    LastnameRu: string;
    Gender?: number; // Optional
    Phone1?: string; // Optional
    Phone2?: string; // Optional
    Email?: string; // Optional
    Photo?: File; // Optional
    Category?: number; // Optional
    NationalityEn?: string; // Optional
    NationalityUz?: string; // Optional
    NationalityRu?: string; // Optional
    NationalityUzRu?: string; // Optional
    NationalityKaa?: string; // Optional
    Birthday?: Date; // Optional
    BirthPlaceUz?: string; // Optional
    BirthPlaceEn?: string; // Optional
    BirthPlaceRu?: string; // Optional
    BirthPlaceUzRu?: string; // Optional
    BirthPlaceKaa?: string; // Optional
    PositionEn?: string; // Optional
    PositionUz?: string; // Optional
    PositionRu?: string; // Optional
    PositionUzRu?: string; // Optional
    PositionKaa?: string; // Optional
    WorkFromDate?: Date; // Optional
    WorkPlaceUz?: string; // Optional
    WorkPlaceEn?: string; // Optional
    WorkPlaceRu?: string; // Optional
    WorkPlaceUzRu?: string; // Optional
    WorkPlaceKaa?: string; // Optional
    ReceptionTimeUz?: string; // Optional
    ReceptionTimeEn?: string; // Optional
    ReceptionTimeRu?: string; // Optional
    ReceptionTimeUzRu?: string; // Optional
    ReceptionTimeKaa?: string; // Optional
}

export interface EmployeeUpdateRequest {
    Id: string; // Required
    FirstnameEn?: string; // Optional
    FirstnameRu?: string; // Optional
    LastnameEn?: string; // Optional
    LastnameRu?: string; // Optional
    Gender?: number; // Optional
    Phone1?: string; // Optional
    Phone2?: string; // Optional
    Email?: string; // Optional
    Photo?: File; // Optional
    Category?: EmployeeCategory; // Optional
    NationalityEn?: string; // Optional
    NationalityUz?: string; // Optional
    NationalityRu?: string; // Optional
    NationalityUzRu?: string; // Optional
    NationalityKaa?: string; // Optional
    Birthday?: Date; // Optional
    BirthPlaceUz?: string; // Optional
    BirthPlaceEn?: string; // Optional
    BirthPlaceRu?: string; // Optional
    BirthPlaceUzRu?: string; // Optional
    BirthPlaceKaa?: string; // Optional
    PositionEn?: string; // Optional
    PositionUz?: string; // Optional
    PositionRu?: string; // Optional
    PositionUzRu?: string; // Optional
    PositionKaa?: string; // Optional
    WorkFromDate?: Date; // Optional
    WorkPlaceUz?: string; // Optional
    WorkPlaceEn?: string; // Optional
    WorkPlaceRu?: string; // Optional
    WorkPlaceUzRu?: string; // Optional
    WorkPlaceKaa?: string; // Optional
    ReceptionTimeUz?: string; // Optional
    ReceptionTimeEn?: string; // Optional
    ReceptionTimeRu?: string; // Optional
    ReceptionTimeUzRu?: string; // Optional
    ReceptionTimeKaa?: string; // Optional
}

// EmployeeDeleteRequest interface for DELETE /api/Employee
export interface EmployeeDeleteRequest {
    id: string; // Required
}

// EmployeeResponse interface for GET /api/Employee
export interface EmployeeResponse {
    id: string; // UUID
    firstnameEn: string;
    firstnameRu: string;
    lastnameEn: string;
    lastnameRu: string;
    gender?: EnumResponse; // Optional
    phone1?: string; // Optional
    phone2?: string; // Optional
    email?: string; // Optional
    photo?: string; // URL or path to the photo
    category?: EnumResponse; // Optional
    nationalityEn?: string; // Optional
    nationalityUz?: string; // Optional
    nationalityRu?: string; // Optional
    nationalityUzRu?: string; // Optional
    nationalityKaa?: string; // Optional
    birthday?: Date; // Optional
    birthPlaceUz?: string; // Optional
    birthPlaceEn?: string; // Optional
    birthPlaceRu?: string; // Optional
    birthPlaceUzRu?: string; // Optional
    birthPlaceKaa?: string; // Optional
    positionEn?: string; // Optional
    positionUz?: string; // Optional
    positionRu?: string; // Optional
    positionUzRu?: string; // Optional
    positionKaa?: string; // Optional
    workFromDate?: Date; // Optional
    workPlaceUz?: string; // Optional
    workPlaceEn?: string; // Optional
    workPlaceRu?: string; // Optional
    workPlaceUzRu?: string; // Optional
    workPlaceKaa?: string; // Optional
    receptionTimeUz?: string; // Optional
    receptionTimeEn?: string; // Optional
    receptionTimeRu?: string; // Optional
    receptionTimeUzRu?: string; // Optional
    receptionTimeKaa?: string; // Optional
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}