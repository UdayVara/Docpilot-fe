"use server";

import { signIn, signOut, auth } from "@/auth";
import { signupService } from "@/services/auth.service";
import { SignupCredentials } from "@/types/auth";
import { AuthError } from "next-auth";

export async function handleSignup(data: SignupCredentials) {
  try {
    const result = await signupService(data);
    console.log("result",result)
    if (result?.statusCode === 201) {
      // Auto login after signup
      return await handleLogin({ email: data.email, password: data.password });
    }
    
    return { success: false, message: result.message || "Signup failed" };
  } catch (error: any) {
    console.log("error",error)
    return { 
      success: false, 
      message: error?.response?.data?.message || error?.message || "Something went wrong" 
    };
  }
}

export async function handleLogin(credentials: any) {
  try {
    console.log("credentials",credentials)
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    console.log("login")
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
    console.log("error",error)
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
