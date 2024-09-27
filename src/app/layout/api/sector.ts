export interface SectorResponse {
    id: string; // uuid
    nameUz: string;
    nameEn: string;
    nameRu: string;
    nameUzRu: string;
    nameKaa?: string; // Optional
    descriptionUz: string;
    descriptionEn: string;
    descriptionRu: string;
    descriptionUzRu: string;
    descriptionKaa?: string; // Optional
    employeeId: string; // uuid
    locationId: string; // uuid
    photo?: string; // Optional binary format
  }
  
  // CreateSectorRequest Interface (for POST requests)
  export interface CreateSectorRequest {
    nameUz: string;
    nameEn: string;
    nameRu: string;
    nameUzRu: string;
    nameKaa?: string; // Optional
    descriptionUz: string;
    descriptionEn: string;
    descriptionRu: string;
    descriptionUzRu: string;
    descriptionKaa?: string; // Optional
    employeeId: string; // uuid
    locationId: string; // uuid
    photo?: File; // Optional for binary file upload
  }
  
  // UpdateSectorRequest Interface (for PUT requests)
  export interface UpdateSectorRequest {
    id: string; // uuid
    nameUz?: string;
    nameEn?: string;
    nameRu?: string;
    nameUzRu?: string;
    nameKaa?: string; // Optional
    descriptionUz?: string;
    descriptionEn?: string;
    descriptionRu?: string;
    descriptionUzRu?: string;
    descriptionKaa?: string; // Optional
    employeeId?: string; // uuid
    locationId?: string; // uuid
    photo?: File; // Optional for binary file upload
  }
  
  // DeleteSectorRequest Interface (for DELETE requests)
  export interface DeleteSectorRequest {
    id: string; // uuid
  }
  