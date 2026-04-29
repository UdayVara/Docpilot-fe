"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { FileText, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email }));
      router.push("/chat");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Top Right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center px-4">
        
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Docpilot</span>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            
            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Demo */}
            <button
              onClick={() => {
                localStorage.setItem(
                  "user",
                  JSON.stringify({ email: "demo@example.com" })
                );
                router.push("/chat");
              }}
              className="w-full border border-border py-3 rounded-lg hover:bg-muted transition text-sm font-medium"
            >
              Try Demo
            </button>

            {/* Signup */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Secure • Private • Fast
          </p>
        </div>
      </div>
    </div>
  );
}