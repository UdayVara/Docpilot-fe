export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  statusCode: number;
  user?: any;
  access_token?: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
