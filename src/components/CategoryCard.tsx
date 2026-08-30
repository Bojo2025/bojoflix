import Link from "next/link";
import { CATEGORIES } from "@/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: (typeof CATEGORIES)[0];
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${category.gradient} backdrop-blur-sm group`}
    >
      <div className="absolute inset-0 bg-surface-card/80" />
      <div className="relative p-6 sm:p-8">
        <div className="text-4xl mb-4">{category.flag}</div>
        <h3 className="font-display font-bold text-2xl mb-2">{category.label}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {category.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/browse/${category.id}/theatre/`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-medium transition-all group/btn"
          >
            In Theatre
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href={`/browse/${category.id}/ott/`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-medium transition-all shadow-lg shadow-brand-500/20 group/btn"
          >
            OTT Streaming
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
