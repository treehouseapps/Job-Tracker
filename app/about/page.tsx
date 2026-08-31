export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-800">
      <section className="max-w-3xl mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Keep your job applications organized and on track.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Job Tracker is a simple job application tracker designed to help job
          seekers organize their applications and keep track of their progress
          throughout the hiring process.
        </p>
      </section>

      <section className="mb-16 bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12">
        <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3 block">
          Our Mission
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          Making the job search easier to manage
        </h2>

        <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
          Our goal is to give job seekers a clear and organized way to manage
          their applications, follow their progress, and keep important
          application details in one place.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">
          What We Focus On
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Stay Organized
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Keep your job applications and important details organized in one
              convenient place.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Track Progress
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Follow each application as it moves from an initial application to
              an interview, offer, or final decision.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Simple Experience
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Keep the process simple so you can focus on your applications
              instead of managing scattered notes and information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
