export interface GetAboutRequest {
    id: string;
}

export interface GetAboutResponse {
  locationId: string;           // UUID for the location
  location: any | null;         // Can be a nested location object or null
  receptionTimeUz: string;      // Reception time in Uzbek
  receptionTimeEn: string;      // Reception time in English
  receptionTimeRu: string;      // Reception time in Russian
  receptionTimeUzRu: string;    // Reception time in Cyrillic Uzbek
  receptionTimeKaa: string;     // Reception time in Karakalpak
  descriptionUz: string;        // Description in Uzbek
  descriptionEn: string;        // Description in English
  descriptionRu: string;        // Description in Russian
  descriptionUzRu: string;      // Description in Cyrillic Uzbek
  descriptionKaa: string;       // Description in Karakalpak
  createdBy: string;            // UUID of the user who created the entry
  createdAt: string;            // Timestamp of when the entry was created
  updatedBy: string;            // UUID of the user who updated the entry
  updatedAt: string;            // Timestamp of when the entry was last updated
  id: string;                   // UUID of the entry
}
  
export interface CreateAboutCommand {
  descriptionUz: string;        // Description in Uzbek
  descriptionEn: string;        // Description in English
  descriptionRu: string;        // Description in Russian
  descriptionUzRu: string;      // Description in Cyrillic Uzbek
  descriptionKaa: string;       // Description in Karakalpak
  locationId: string;           // UUID for the location
  receptionTimeUz: string;      // Reception time in Uzbek
  receptionTimeEn: string;      // Reception time in English
  receptionTimeRu: string;      // Reception time in Russian
  receptionTimeUzRu: string;    // Reception time in Cyrillic Uzbek
  receptionTimeKaa: string;     // Reception time in Karakalpak
}

export interface CreateAboutResponse {
  locationId: string;           // UUID for the location
  location: any | null;         // Can be a nested location object or null
  receptionTimeUz: string;      // Reception time in Uzbek
  receptionTimeEn: string;      // Reception time in English
  receptionTimeRu: string;      // Reception time in Russian
  receptionTimeUzRu: string;    // Reception time in Cyrillic Uzbek
  receptionTimeKaa: string;     // Reception time in Karakalpak
  descriptionUz: string;        // Description in Uzbek
  descriptionEn: string;        // Description in English
  descriptionRu: string;        // Description in Russian
  descriptionUzRu: string;      // Description in Cyrillic Uzbek
  descriptionKaa: string;       // Description in Karakalpak
  createdBy: string;            // UUID of the user who created the entry
  createdAt: string;            // Timestamp of when the entry was created
  updatedBy: string;            // UUID of the user who updated the entry
  updatedAt: string;            // Timestamp of when the entry was last updated
  id: string;                   // UUID of the entry
}

export interface UpdateAboutCommand {
  id: string;                  // UUID of the reception details
  descriptionUz: string;        // Description in Uzbek
  descriptionEn: string;        // Description in English
  descriptionRu: string;        // Description in Russian
  descriptionUzRu: string;      // Description in Cyrillic Uzbek
  descriptionKaa: string;       // Description in Karakalpak
  locationId: string;           // UUID of the location
  receptionTimeUz: string;      // Reception time in Uzbek
  receptionTimeEn: string;      // Reception time in English
  receptionTimeRu: string;      // Reception time in Russian
  receptionTimeUzRu: string;    // Reception time in Cyrillic Uzbek
  receptionTimeKaa: string;     // Reception time in Karakalpak
}

export interface UpdateAboutResponse {
  locationId: string;           // UUID for the location
  location: any | null;         // Can be a nested location object or null
  receptionTimeUz: string;      // Reception time in Uzbek
  receptionTimeEn: string;      // Reception time in English
  receptionTimeRu: string;      // Reception time in Russian
  receptionTimeUzRu: string;    // Reception time in Cyrillic Uzbek
  receptionTimeKaa: string;     // Reception time in Karakalpak
  descriptionUz: string;        // Description in Uzbek
  descriptionEn: string;        // Description in English
  descriptionRu: string;        // Description in Russian
  descriptionUzRu: string;      // Description in Cyrillic Uzbek
  descriptionKaa: string;       // Description in Karakalpak
  createdBy: string;            // UUID of the user who created the entry
  createdAt: string;            // Timestamp of when the entry was created
  updatedBy: string;            // UUID of the user who updated the entry
  updatedAt: string;            // Timestamp of when the entry was last updated
  id: string;                   // UUID of the entry
}

export interface DeleteAboutCommand {
    id: string;
}

export interface DeleteAboutResponse {
    success: boolean;
}

export interface GetAllAboutQuery {
    query?: string;
}

export interface GetAllAboutResponse {
    data: GetAboutResponse[];
}
  