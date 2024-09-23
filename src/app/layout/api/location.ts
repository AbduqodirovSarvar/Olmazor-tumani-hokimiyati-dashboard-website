export interface LocationResponse {
    latitude: number;
    longitude: number;
    nameUz: string;
    nameEn: string;
    nameRu: string;
    nameUzRu: string;
    nameKaa: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    id: string;
}

export interface CreateLocationRequest{
  nameUz: string;
  nameEn: string;
  nameRu: string;
  nameUzRu: string;
  nameKaa: string;
  latitude: number;
  longitude: number;
}
  
export interface UpdateLocationRequest{
  id: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  nameUzRu: string;
  nameKaa: string;
  latitude: number;
  longitude: number;
}

export interface DeleteLocationRequest {
    id: string;
}