"use server";

import { signIn, signOut, auth } from "@/auth";
import { authService } from "@/services/auth.service";
import { SignupCredentials } from "@/types/auth";
import { AuthError } from "next-auth";

export async function handleSignup(data: SignupCredentials) {
  try {
    const result = await authService.signup(data);
    
    if (result.success) {
      // Auto login after signup
      return await handleLogin({ email: data.email, password: data.password });
    }
    
    return { success: false, message: result.message || "Signup failed" };
  } catch (error: any) {
    return { 
      success: false, 
      message: error?.response?.data?.message || error?.message || "Something went wrong" 
    };
  }
}

export async function handleLogin(credentials: any) {
  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials." };
        default:
          return { success: false, message: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function handleSignout() {
  await signOut({ redirectTo: "/login" });
}

export async function getUserClient() {
  const session = await auth();
  if (session?.user) {
    return {
      success: true,
      data: {
        user: session.user,
        token: (session.user as any).token, // Assuming we store token in session
      },
    };
  }
  return { success: false };
}
