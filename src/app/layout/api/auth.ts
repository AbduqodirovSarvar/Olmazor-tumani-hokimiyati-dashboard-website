import { User } from "./user";

export interface SignInResponse {
  accessToken: string;
  user: User;
}

export interface SignInCommand {
  email: string;
  password: string;
}

export interface GetEmailConfirmationCodeRequest {
  email: string;
}

export interface GetEmailConfirmationCodeResponse {
  success: boolean;
}

export interface ResetPasswordCommand {
  email: string;
  password: string;
  confirmPassword: string;
  confirmationCode: string;
}

export interface ResetPasswordResponse {
  success: boolean;
}