"use client";

import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Application } from "@/type/page";

export default function ApplicationsPage() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    const getApplications = async () => {
      const result = await fetch("/api/applications");

      if (result.status === 401) {
        router.push("/auth/login");
        return;
      }

      const data = await result.json();

      setApplications(data);
    };

    getApplications();
  }, [router]);

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              My Applications
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and track all of your job applications.
            </p>
          </div>

          <Link href="/applications/new">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          </Link>
        </div>

        <div className="mt-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-indigo-600" />

              <input
                type="text"
                placeholder="Search company or position..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 text-sm text-slate-600 bg-slate-50 rounded-xl outline-none border border-slate-100"
            >
              <option>All Statuses</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Withdrawn</option>
            </select>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Applications
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {filteredApplications.length} applications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {application.jobTitle}
                      </h3>

                      <p className="text-sm font-medium text-slate-600 mt-1">
                        {application.company}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                          {application.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-indigo-500" />
                          {application.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="w-fit px-3 py-1.5 rounded-full border text-xs font-semibold">
                    {application.status}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/applications/${application.id}`}
                      className="px-4 py-2 text-xm font-semibold text-slate-600 bg-slate-300 hover:bg-slate-200 rounded transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
