export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
