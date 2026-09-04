"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setError(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and symbol.",
      );
      return;
    }
    setSaving(true);
    setError("");

    const result = await fetch("/api/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await result.json();

    if (result.ok) {
      router.push("/profile");
      return;
    }

    setError(data.message);
    setSaving(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>

      <form onSubmit={handleChangePassword} className="space-y-5">
        <div>
          <label className="block mb-2">Current Password</label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2">New Password</label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2">Confirm New Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-3 bg-indigo-600 text-white rounded-full"
        >
          {saving ? "Changing..." : "Change Password"}
        </button>
      </form>
    </main>
  );
}
