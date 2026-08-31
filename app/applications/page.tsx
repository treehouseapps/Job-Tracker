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

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      location: "Addis Ababa",
      appliedDate: "August 28, 2026",
      status: "Interview",
      statusColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      location: "Remote",
      appliedDate: "August 24, 2026",
      status: "Applied",
      statusColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: 3,
      company: "Ethiopian Airlines",
      position: "Full-Stack Developer",
      location: "Addis Ababa",
      appliedDate: "August 20, 2026",
      status: "Rejected",
      statusColor: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      id: 4,
      company: "Safaricom",
      position: "Backend Developer",
      location: "Addis Ababa",
      appliedDate: "August 15, 2026",
      status: "Offer",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
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

        {/* Search and Filter */}
        <div className="mt-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-indigo-600" />

              <input
                type="text"
                placeholder="Search company or position..."
                className="w-full text-sm outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <select className="px-4 py-2.5 text-sm text-slate-600 bg-slate-50 rounded-xl outline-none border border-slate-100">
              <option>All Statuses</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Withdrawn</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Applications
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {applications.length} applications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Application Information */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BriefcaseBusiness className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {application.position}
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

                  {/* Status */}
                  <span
                    className={`w-fit px-3 py-1.5 rounded-full border text-xs font-semibold ${application.statusColor}`}
                  >
                    {application.status}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/applications/${application.id}`}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      View
                    </Link>

                    <Link
                      href={`/applications/${application.id}/edit`}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
