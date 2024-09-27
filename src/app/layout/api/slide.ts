// SlideResponse Interface (for GET requests)
export interface SlideResponse {
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
    photo: string; // binary format
  }
  
  // CreateSlideRequest Interface (for POST requests)
  export interface CreateSlideRequest {
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
    photo: File; // binary file upload
  }
  
  // UpdateSlideRequest Interface (for PUT requests)
  export interface UpdateSlideRequest {
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
    photo?: File; // Optional for binary file upload
  }
  
  // DeleteSlideRequest Interface (for DELETE requests)
  export interface DeleteSlideRequest {
    id: string; // uuid
  }
  