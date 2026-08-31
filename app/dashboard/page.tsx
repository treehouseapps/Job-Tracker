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

export default function Dashboard() {
  const stats = [
    {
      title: "Total Applications",
      value: "12",
      description: "All applications",
      icon: BriefcaseBusiness,
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Interviews",
      value: "3",
      description: "In progress",
      icon: CalendarDays,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Offers",
      value: "1",
      description: "Received",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Rejected",
      value: "2",
      description: "Final decisions",
      icon: XCircle,
      iconStyle: "bg-rose-50 text-rose-600",
    },
  ];

  const recentApplications = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      status: "Interview",
      statusStyle: "bg-indigo-50 text-indigo-600 border-indigo-200",
      date: "August 28, 2026",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      status: "Applied",
      statusStyle: "bg-blue-50 text-blue-600 border-blue-200",
      date: "August 24, 2026",
    },
    {
      id: 3,
      company: "Safaricom",
      position: "Backend Developer",
      status: "Offer",
      statusStyle: "bg-emerald-50 text-emerald-600 border-emerald-200",
      date: "August 20, 2026",
    },
    {
      id: 4,
      company: "Ethiopian Airlines",
      position: "Full-Stack Developer",
      status: "Rejected",
      statusStyle: "bg-rose-50 text-rose-600 border-rose-200",
      date: "August 18, 2026",
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

        <section className="mt-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Application Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A quick look at your application progress.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Applied</p>
              <p className="mt-1 text-xl font-bold text-slate-900">6</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Interview</p>
              <p className="mt-1 text-xl font-bold text-slate-900">3</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Offer</p>
              <p className="mt-1 text-xl font-bold text-slate-900">1</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Rejected</p>
              <p className="mt-1 text-xl font-bold text-slate-900">2</p>
            </div>
          </div>
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
              <div
                key={application.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <BriefcaseBusiness className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {application.position}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {application.company}
                      </p>

                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                        <Clock3 className="w-3.5 h-3.5" />
                        {application.date}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`w-fit px-3 py-1.5 rounded-full border text-xs font-semibold ${application.statusStyle}`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
