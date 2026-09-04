"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const result = await fetch("/api/session");
      const data = await result.json();

      setIsLoggedIn(data.user ? true : false);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/brand.jpg" alt="Job Tracker logo" />
          </div>
          Job Tracker
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/dashboard"
            className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="/applications"
            className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Applications
          </Link>

          <Link
            href="/about"
            className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
        </nav>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/register">
              <button className="px-4 py-2 text-sm font-medium bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                Sign Up
              </button>
            </Link>

            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
