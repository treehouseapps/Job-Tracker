"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/type/page";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetch("/api/profile");

      if (result.status === 401) {
        router.push("/auth/login");
        return;
      }

      const data = await result.json();

      setProfile(data);
    };

    getProfile();
  }, [router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete delete your account?")) {
      return;
    }

    const result = await fetch("/api/profile", {
      method: "DELETE",
    });

    if (result.ok) {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      window.location.href = "/";
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-slate-500 mt-2">Manage your account information.</p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-500">Name</p>
          <p className="text-lg font-medium">{profile.name}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Email</p>
          <p className="text-lg font-medium">{profile.email}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Joined</p>
          <p className="text-lg font-medium">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Link
            href="/profile/edit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-full"
          >
            Edit Profile
          </Link>

          <Link
            href="/profile/password"
            className="px-5 py-2 bg-slate-100 rounded-full"
          >
            Change Password
          </Link>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-100 text-red-600 rounded-full"
          >
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
}
