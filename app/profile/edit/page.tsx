"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetch("/api/profile");

      if (result.status === 401) {
        router.push("/auth/login");
        return;
      }

      const data = await result.json();

      setName(data.name);
      setEmail(data.email);
      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const result = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block mb-2">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-3 bg-indigo-600 text-white rounded-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
