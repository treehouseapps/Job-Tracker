import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
              <img src="/brand.jpg" alt="Job Tracker logo" />
            </div>
            Job Tracker
          </div>

          <p className="text-sm leading-relaxed max-w-md">
            Job Tracker helps job seekers organize and track their job
            applications throughout the hiring process.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-semibold mb-4">Navigation</h4>

          <ul className="space-y-3">
            <li>
              <Link
                href="/dashboard"
                className="hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/applications"
                className="hover:text-white transition-colors"
              >
                Applications
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/profile"
                className="hover:text-white transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="pt-6 mt-8 border-t border-slate-800 text-xs">
          <p>© {new Date().getFullYear()} Job Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
