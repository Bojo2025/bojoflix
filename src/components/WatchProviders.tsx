import Image from "next/image";
import { WatchProvider } from "@/types";
import { getImageUrl } from "@/lib/tmdb";
import { ExternalLink, Play, ShoppingCart, DollarSign } from "lucide-react";

interface WatchProvidersProps {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
  link?: string;
  title: string;
}

function ProviderSection({
  title,
  providers,
  icon,
}: {
  title: string;
  providers: WatchProvider[];
  icon: React.ReactNode;
}) {
  if (!providers?.length) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {providers.map((provider) => (
          <div
            key={provider.provider_id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            title={provider.provider_name}
          >
            {provider.logo_path && (
              <Image
                src={getImageUrl(provider.logo_path, "w200")}
                alt={provider.provider_name}
                width={32}
                height={32}
                className="rounded-lg"
              />
            )}
            <span className="text-sm font-medium text-gray-200">
              {provider.provider_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WatchProvidersSection({
  flatrate,
  rent,
  buy,
  free,
  link,
  title,
}: WatchProvidersProps) {
  const hasProviders =
    flatrate?.length || rent?.length || buy?.length || free?.length;

  if (!hasProviders) {
    return (
      <div className="rounded-2xl bg-surface-elevated border border-white/5 p-6">
        <h2 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
          <Play className="w-5 h-5 text-brand-500" />
          Where to Watch
        </h2>
        <p className="text-gray-400 text-sm">
          Streaming availability for &ldquo;{title}&rdquo; is not currently listed.
          Check your local theatres or streaming platforms.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(title + " where to watch")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Search availability
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface-elevated border border-white/5 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <Play className="w-5 h-5 text-brand-500" />
          Where to Watch Online
        </h2>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
          >
            View all options
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <ProviderSection
        title="Stream"
        providers={flatrate || []}
        icon={<Play className="w-4 h-4 text-emerald-400" />}
      />
      <ProviderSection
        title="Free"
        providers={free || []}
        icon={<Play className="w-4 h-4 text-blue-400" />}
      />
      <ProviderSection
        title="Rent"
        providers={rent || []}
        icon={<DollarSign className="w-4 h-4 text-yellow-400" />}
      />
      <ProviderSection
        title="Buy"
        providers={buy || []}
        icon={<ShoppingCart className="w-4 h-4 text-purple-400" />}
      />
    </div>
  );
}
