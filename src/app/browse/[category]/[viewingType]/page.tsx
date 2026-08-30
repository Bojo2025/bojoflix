import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RegionCategory, ViewingType, getCategoryConfig, VIEWING_TYPES } from "@/types";
import BrowseContent from "@/components/BrowseContent";
import { Loader2 } from "lucide-react";

const VALID_CATEGORIES: RegionCategory[] = ["american", "indian", "international"];
const VALID_VIEWING: ViewingType[] = ["theatre", "ott"];

interface PageProps {
  params: Promise<{ category: string; viewingType: string }>;
}

export function generateStaticParams() {
  return VALID_CATEGORIES.flatMap((category) =>
    VALID_VIEWING.map((viewingType) => ({ category, viewingType }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { category, viewingType } = await params;
  const cat = getCategoryConfig(category as RegionCategory);
  const viewing = VIEWING_TYPES.find((v) => v.id === viewingType);
  return {
    title: `${cat?.label || "Browse"} ${viewing?.label || ""} — BojoFlix`,
  };
}

export default async function BrowsePage({ params }: PageProps) {
  const { category, viewingType } = await params;

  if (
    !VALID_CATEGORIES.includes(category as RegionCategory) ||
    !VALID_VIEWING.includes(viewingType as ViewingType)
  ) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      }
    >
      <BrowseContent
        category={category as RegionCategory}
        viewingType={viewingType as ViewingType}
      />
    </Suspense>
  );
}
