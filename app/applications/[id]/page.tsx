"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Application } from "@/type/page";

export default function ApplicationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const getApplication = async () => {
      const { id } = await params;

      const result = await fetch(`/api/applications/${id}`);

      if (result.status === 401) {
        router.push("/auth/login");
        return;
      }

      const data = await result.json();

      setApplication(data);
    };

    getApplication();
  }, [router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }
    const { id } = await params;
    const result = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (result.status === 401) {
      router.push("/auth/login");
      return;
    }

    router.push("/applications");
  };

  if (!application) {
    return <div>Loading...</div>;
  }
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/applications"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BriefcaseBusiness className="w-7 h-7" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {application.jobTitle}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {application.company}
              </p>
            </div>
          </div>

          <span className="w-fit px-4 py-2 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200 text-xs font-semibold">
            {application.status}
          </span>
        </div>

        <section className="mt-8 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Application Details
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                Company
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {application.company}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <BriefcaseBusiness className="w-4 h-4" />
                Position
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {application.jobTitle}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Location
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {application.location}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <CalendarDays className="w-4 h-4" />
                Applied Date
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {application.appliedDate}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />

            <h2 className="text-lg font-bold text-slate-900">Notes</h2>
          </div>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            {application.notes}
          </p>
        </section>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-full transition-colors"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
            onClick={() => router.push(`/applications/${application.id}/edit`)}
          >
            <Pencil className="w-4 h-4" />
            Edit Application
          </button>
        </div>
      </div>
    </main>
  );
}
