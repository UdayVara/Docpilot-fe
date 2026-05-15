
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FileText,
  Send,
  Upload,
  LogOut,
  Menu,
  X,
  Plus,
  File,
} from "lucide-react";

import axiosInstance from "@/lib/axios";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

type Chat = {
  id: string;
  name: string;
  fileUrl: string;
  user_id: string;
};

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chats, setChats] = useState<Chat[]>([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const fetchChats = async () => {
    try {
      const response = await axiosInstance.get("/chat");

      if (response.data.success) {
        setChats(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch chats", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = input;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        sender: "user",
      },
    ]);

    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: `This is a sample response to "${userMessage}"`,
          sender: "ai",
        },
      ]);

      setIsLoading(false);
    }, 800);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    try {
      for (const file of Array.from(files)) {
        if (file.type !== "application/pdf") {
          continue;
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("name", file.name);

        const response = await axiosInstance.post(
          "/chat",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              text: `✓ Uploaded "${file.name}"`,
              sender: "ai",
            },
          ]);
        }
      }

      await fetchChats();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} ${
          mobileOpen
            ? "fixed inset-y-0 left-0 w-64 z-50"
            : ""
        } bg-card border-r border-border flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>

            <span className="font-bold text-lg">
              DocPilot
            </span>
          </div>

          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* New Chat */}
        <div className="p-4">
          <button className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground py-2 px-4 rounded-lg">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <p className="text-xs text-muted-foreground font-semibold px-2 py-4">
            RECENT CHATS
          </p>

          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors truncate text-sm"
            >
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-primary flex-shrink-0" />

                <span className="truncate">
                  {chat.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* User */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="px-3 py-2 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Logged in as
            </p>

            <p className="font-medium truncate">
              {user.name || "User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-destructive py-2 px-3 hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileOpen(!mobileOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 hover:bg-secondary rounded-lg"
            >
              {sidebarOpen || mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <h1 className="text-xl font-bold">
              {chats.length > 0
                ? chats[0].name
                : "DocPilot"}
            </h1>
          </div>

          <ThemeToggle />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  Welcome to DocPilot
                </h2>

                <p className="text-muted-foreground mb-6 max-w-sm">
                  Upload a PDF file to get started.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-none"
                        : "bg-secondary text-foreground rounded-bl-none border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-none px-4 py-3 border border-border">
                    Loading...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card p-6">
          {chats.length > 0 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg text-sm"
                >
                  <File className="w-4 h-4 text-primary" />

                  <span className="truncate max-w-[150px]">
                    {chat.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="flex gap-3"
          >
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder={
                  chats.length > 0
                    ? "Ask a question..."
                    : "Upload a PDF first..."
                }
                disabled={chats.length === 0}
                className="flex-1 bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="p-3 bg-secondary border border-border rounded-xl"
              >
                <Upload className="w-5 h-5 text-primary" />
              </button>
            </div>

            <button
              type="submit"
              disabled={
                !input.trim() ||
                isLoading ||
                chats.length === 0
              }
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-3 rounded-xl disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />

              <span className="hidden sm:inline">
                Send
              </span>
            </button>
          </form>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
        </div>
      </div>
    </div>
  );
}

