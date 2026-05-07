import axiosInstance from "@/lib/axios";
import { LoginCredentials, SignupCredentials, AuthResponse } from "@/types/auth";

export const authService = {
  async signup(data: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post("/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || "string", // Backend seems to expect phone
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async login(data: LoginCredentials): Promise<AuthResponse> {
    try {
      // Backend expects "Email" and "Password" with capital letters based on curl
      const response = await axiosInstance.post("/user/login", {
        Email: data.email,
        Password: data.password,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  },
};
