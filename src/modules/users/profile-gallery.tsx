"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatImage } from "@/utils/format-image";

interface ProfileGalleryProps {
  images?: string[];
  alt: string;
}

export default function ProfileGallery({
  images,
  alt,
}: Readonly<ProfileGalleryProps>) {
  const valid = (images ?? []).filter(Boolean);
  const [active, setActive] = useState(0);

  if (valid.length === 0) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-3xl bg-linear-to-br from-pink-50 to-gray-100 text-gray-300">
        <User className="size-24 stroke-1" />
      </div>
    );
  }

  const current = Math.min(active, valid.length - 1);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
        <Image
          src={formatImage(valid[current])}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover"
          priority
        />
      </div>

      {valid.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {valid.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative size-16 overflow-hidden rounded-xl border-2 transition",
                i === current
                  ? "border-[#E32C6F]"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={formatImage(img)}
                alt={`${alt} photo ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
