"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { FileText, ArrowRight } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: data.email })
      );

      router.push("/chat");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-10">

            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:rotate-3">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>

            <span className="font-semibold text-xl mt-3 tracking-tight">
              Docpilot
            </span>
          </div>

          {/* Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

            {/* Heading */}
            <div className="mb-8 text-center">

              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome back
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-background/70 border border-border rounded-xl transition-all duration-200 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />

                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full px-4 py-3 bg-background/70 border border-border rounded-xl transition-all duration-200 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />

                {errors.password && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 mt-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}

                {!isLoading && (
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">

              <div className="flex-1 h-px bg-border" />

              <span className="text-xs text-muted-foreground tracking-wide">
                OR
              </span>

              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Signup */}
            <p className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}

              <Link
                href="/signup"
                className="text-primary font-medium transition-all hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8 tracking-wide">
            Secure • Private • Fast
          </p>
        </div>
      </div>
    </div>
  );
}