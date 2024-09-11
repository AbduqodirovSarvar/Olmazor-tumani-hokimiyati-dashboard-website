export interface UserRole {
   id: number;
   nameUz: string;
   nameEn: string;
   nameRu: string;
   nameUzRu: string;
}
  
export interface Gender {
   id: number;
   nameUz: string;
   nameEn: string;
   nameRu: string;
   nameUzRu: string;
}

export interface User {
    firstnameEn: string;
    firstnameRu: string;
    lastnameEn: string;
    lastnameRu: string;
    gender: Gender;
    userrole: UserRole;
    phone1: string;
    phone2: string;
    email: string;
    photo: string | null;
    id: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
  }