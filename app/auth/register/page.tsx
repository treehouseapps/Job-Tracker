"use client";

import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [buttonText, setButtonText] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError(false);
    setErrorText("");
    setButtonText(false);

    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) => {
      const validations = {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password),
      };
      const isValid = Object.values(validations).every(Boolean);
      return { ...validations, isValid };
    };

    const validateName = (name: string) => {
      const trimmed = name.trim();
      const validPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-]?[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
      return trimmed.length >= 2 && validPattern.test(trimmed);
    };

    if (!validateName(name)) {
      setError(true);
      setErrorText("Please enter a valid name.");
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setErrorText("Please enter a valid email address.");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(true);
      setErrorText(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and symbol.",
      );
      return;
    }

    setError(false);
    setErrorText("");
    setButtonText(true);
    try {
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        setError(true);
        setErrorText(errorData.message);
        return;
      }

      const data = await result.json();
      console.log(data);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="bg-white flex flex-col justify-center pt-5 text-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Create your account
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Start organizing and tracking your job applications
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-100 rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:outline-none transition-colors placeholder:text-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email address
              </label>

              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:outline-none transition-colors placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:outline-none transition-colors placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <div className="text-xm text-red-500 leading-relaxed pt-2">
                {errorText}
              </div>
            )}
            <div className="text-xs text-slate-500 leading-relaxed pt-2">
              By creating an account, you agree to our{" "}
              <a href="/" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full text-sm transition-colors shadow-sm mt-4"
            >
              {buttonText ? "Create Account" : "Loading..."}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
