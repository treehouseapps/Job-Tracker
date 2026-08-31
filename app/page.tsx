import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clock3,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      number: "1",
      title: "Add your applications",
      description:
        "Record the jobs you've applied for with details such as company, position, location, and application date.",
      icon: ClipboardList,
    },
    {
      number: "2",
      title: "Track your progress",
      description:
        "Keep an eye on every application and update its status as you move through the hiring process.",
      icon: ChartNoAxesCombined,
    },
    {
      number: "3",
      title: "Stay organized",
      description:
        "Keep all your job applications in one place so you always know where you stand with each opportunity.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Keep your{" "}
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg inline-block shadow-sm">
                job search
              </span>{" "}
              organized
            </h1>

            <p className="mt-4 text-slate-500 max-w-xl text-base sm:text-lg leading-relaxed">
              Track your job applications, monitor your progress, and keep
              everything organized in one simple place.
            </p>

            <div className="mt-8">
              <a href="/register">
                <button className="group inline-flex items-center gap-3 px-8 py-4 text-base sm:text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  Start Tracking
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              Simple Process
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              How Job Tracker Works
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-slate-500">
              Manage your applications from the moment you apply until you
              receive a final decision.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.number}
                    className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  >
                    <div className="absolute -top-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {feature.number}
                    </div>

                    <div className="mt-2 p-3 rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ready to organize your job search?
            </h2>

            <p className="mt-3 text-slate-500">
              Start keeping track of your applications and never lose sight of
              an opportunity again.
            </p>

            <div className="mt-6">
              <a href="/register">
                <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors">
                  Create Your Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
