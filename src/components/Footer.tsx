import Link from "next/link";
import { Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Film className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">
              Bojo<span className="text-brand-500">Flix</span>
            </span>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Ratings powered by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              TMDB
            </a>
            . Streaming info from official providers. No account required.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/browse/american/theatre/" className="hover:text-white transition-colors">
              American
            </Link>
            <Link href="/browse/indian/ott/" className="hover:text-white transition-colors">
              Indian
            </Link>
            <Link href="/browse/international/ott/" className="hover:text-white transition-colors">
              International
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} BojoFlix. Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </div>
      </div>
    </footer>
  );
}
