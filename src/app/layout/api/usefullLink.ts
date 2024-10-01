export interface UsefullLinkResponse {
    id: string;        // UUID of the useful link
    nameUz: string;    // Uzbek name
    nameEn: string;    // English name
    nameRu: string;    // Russian name
    nameUzRu: string;  // Uzbek-Russian name
    nameKaa?: string;  // Optional Kazakh name
    link: string;      // URL link
    photo: string;     // Photo as binary or URL
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }

  
export interface CreateUsefullLinkRequest {
    nameUz: string;    // Uzbek name
    nameEn: string;    // English name
    nameRu: string;    // Russian name
    nameUzRu: string;  // Uzbek-Russian name
    nameKaa?: string;  // Optional Kazakh name
    link: string;      // URL link
    photo: File;       // Photo as binary file
  }

export interface UpdateUsefullLinkRequest {
    id: string;        // UUID of the useful link to update
    nameUz?: string;   // Uzbek name
    nameEn?: string;   // English name
    nameRu?: string;   // Russian name
    nameUzRu?: string; // Uzbek-Russian name
    nameKaa?: string;  // Optional Kazakh name
    link?: string;     // URL link
    photo?: File;      // Photo as binary file
  }

export interface DeleteUsefullLinkRequest {
    id: string;        // UUID of the useful link to delete
  }