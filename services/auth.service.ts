import axiosInstance from "@/lib/axios";
import { LoginCredentials, SignupCredentials, AuthResponse } from "@/types/auth";

export async function signupService(data: SignupCredentials): Promise<AuthResponse> {
  try {
    const response = await axiosInstance.post("/user/signup", {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    console.log("Signup Service Error:", error);
    throw error;
  }
}

export async function loginService(data: LoginCredentials): Promise<AuthResponse> {
  try {
    // Backend expects "Email" and "Password" based on previous curl info
    const response = await axiosInstance.post("/user/login", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    console.log("Login Service Error:", error);
    throw error;
  }
}
