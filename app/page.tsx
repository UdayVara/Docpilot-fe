"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Zap,
  Lock,
  Brain,
  Search,
  Layers,
  MessageSquare,
  Upload,
  CheckCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const router = useRouter();

  

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-bold text-xl">Docpilot</span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Features</span>
            <span className="hover:text-foreground cursor-pointer">How it works</span>
            <span className="hover:text-foreground cursor-pointer">Use cases</span>
          </nav>

          <ThemeToggle />

          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm hover:bg-muted rounded-md"
          >
            Sign In
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 px-8 py-20 max-w-7xl mx-auto items-center">
        
        {/* LEFT */}
        <div>
          <div className="mb-4 text-sm text-primary font-medium">
            AI-Powered Document Intelligence
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Chat with any PDF.  
            <br />
            Get answers instantly.
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Stop wasting time reading long PDFs. Ask questions and get clear,
            accurate answers in seconds.
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Start For Free
            </button>

            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 border rounded-lg"
            >
              Sign In
            </button>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>✔ No credit card</span>
            <span>✔ Setup in 30 sec</span>
            <span>✔ Cancel anytime</span>
          </div>
        </div>

        {/* RIGHT (Mock UI) */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="text-sm mb-4 font-medium">Q3 Financial Report.pdf</div>

          <div className="bg-primary/10 p-4 rounded-lg mb-4">
            What were the main revenue drivers in Q3?
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm">
            • Strong subscription growth  
            • Enterprise adoption increase  
            • Expansion in international markets  
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Everything you need to understand PDFs
          </h2>
          <p className="text-muted-foreground">
            Built for students, professionals, and teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {features.map((f, i) => (
            <div key={i} className="bg-card border p-6 rounded-xl hover:shadow-sm transition">
              <div className="mb-4 text-primary">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <Step icon={<Upload />} title="Upload PDF" desc="Drag & drop your file" />
          <Step icon={<MessageSquare />} title="Ask Questions" desc="Type naturally" />
          <Step icon={<CheckCircle />} title="Get Answers" desc="Instant accurate results" />
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-8 py-20 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-12">
          Designed for every use case
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          <UseCase title="Students" desc="Study faster" />
          <UseCase title="Professionals" desc="Analyze reports" />
          <UseCase title="Researchers" desc="Extract insights" />
          <UseCase title="Legal & Finance" desc="Review documents" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to save hours reading PDFs?
        </h2>
        <button
          onClick={() => router.push("/signup")}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Start For Free
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-muted-foreground text-sm">
        © 2024 Docpilot
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Zap size={20} />,
    title: "Ask Anything",
    desc: "Ask questions in plain English from your PDF.",
  },
  {
    icon: <Brain size={20} />,
    title: "Instant Answers",
    desc: "Get accurate responses with context.",
  },
  {
    icon: <Search size={20} />,
    title: "Smart Search",
    desc: "Find meaning, not just keywords.",
  },
  {
    icon: <Layers size={20} />,
    title: "Multi-Page Understanding",
    desc: "Understands across full document.",
  },
  {
    icon: <Lock size={20} />,
    title: "Private & Secure",
    desc: "Your files are safe and encrypted.",
  },
  {
    icon: <FileText size={20} />,
    title: "Summarize",
    desc: "Turn long PDFs into simple insights.",
  },
];

function Step({ icon, title, desc }: any) {
  return (
    <div>
      <div className="mb-4 text-primary flex justify-center">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function UseCase({ title, desc }: any) {
  return (
    <div className="bg-card border p-6 rounded-xl">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}