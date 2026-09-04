"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Application } from "@/type/page";

export default function Dashboard() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);

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

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected",
  ).length;

  const applied = applications.filter(
    (application) => application.status === "Applied",
  ).length;

  const recentApplications = applications.slice(0, 4);

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "All applications",
      icon: BriefcaseBusiness,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Interviews",
      value: interviews,
      description: "In progress",
      icon: CalendarDays,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Offers",
      value: offers,
      description: "Received",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Rejected",
      value: rejected,
      description: "Final decisions",
      icon: XCircle,
      iconStyle: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's an overview of your job applications.
            </p>
          </div>

          <Link href="/applications/new">
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          </Link>
        </div>

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.title}</p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconStyle}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest job applications.
              </p>
            </div>

            <Link
              href="/applications"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentApplications.map((application) => (
              <Link
                key={application.id}
                href={`/applications/${application.id}`}
                className="block"
              >
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {application.jobTitle}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {application.company}
                        </p>

                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                          <Clock3 className="w-3.5 h-3.5" />

                          {application.appliedDate
                            ? new Date(
                                application.appliedDate,
                              ).toLocaleDateString()
                            : "No date"}
                        </div>
                      </div>
                    </div>

                    <span className="w-fit px-3 py-1.5 rounded-full border text-xs font-semibold bg-slate-50 text-slate-600 border-slate-200">
                      {application.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {recentApplications.length === 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
                <p className="text-sm text-slate-500">No applications yet.</p>

                <Link
                  href="/applications/new"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-indigo-600"
                >
                  <Plus className="w-4 h-4" />
                  Add your first application
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
