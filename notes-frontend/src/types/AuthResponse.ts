// src/types/AuthResponse.ts
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
  message?: string;
}
