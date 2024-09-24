import { EnumResponse } from "./enum";

export interface PostResponse {
    Id: string; // UUID
    nameUz: string;
    nameEn: string;
    nameRu: string;
    nameUzRu: string;
    nameKaa: string;
    descriptionUz: string;
    descriptionEn: string;
    descriptionRu: string;
    descriptionUzRu: string;
    descriptionKaa: string;
    category: number;
    photo?: string;
}

export interface CreatePostRequest {
    NameUz: string;
    NameEn: string;
    NameRu: string;
    NameUzRu: string;
    NameKaa: string;
    DescriptionUz: string;
    DescriptionEn: string;
    DescriptionRu: string;
    DescriptionUzRu: string;
    DescriptionKaa: string;
    Category: number; // Assuming PostCategory is defined elsewhere
    Photo?: File; // For file uploads
}

export interface UpdatePostRequest {
    id: string; // UUID
    nameUz?: string;
    nameEn?: string;
    nameRu?: string;
    nameUzRu?: string;
    nameKaa?: string;
    descriptionUz?: string;
    descriptionEn?: string;
    descriptionRu?: string;
    descriptionUzRu?: string;
    descriptionKaa?: string;
    category?: number; // Assuming PostCategory is defined elsewhere
    photo?: File; // For file uploads
}

export interface DeletePostRequest {
    Id: string; // UUID
}


