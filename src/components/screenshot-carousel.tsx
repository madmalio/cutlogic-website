"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    src: "/cutlogic-shot-job-setup.webp",
    alt: "CutLogic job setup screen",
    title: "Faster Job Setup",
    description: "Set up a door job in minutes with reusable defaults.",
  },
  {
    src: "/cutlogic-shot-catalog.webp",
    alt: "CutLogic catalog and presets screen",
    title: "Catalog + Custom Presets",
    description:
      "Create your own presets for dimensions, materials, and options so every job starts faster and stays consistent.",
  },
  {
    src: "/cutlogic-shot-quick-door.webp",
    alt: "CutLogic quick door mode screen",
    title: "Quick Door Mode",
    description: "Handle one-off doors without a full job workflow.",
  },
  {
    src: "/cutlogic-shot-cut-list.webp",
    alt: "CutLogic generated cut list screen",
    title: "Production-Ready Cut Lists",
    description: "Generate clean outputs with fewer mistakes and less waste.",
  },
  {
    src: "/cutlogic-shot-export.webp",
    alt: "CutLogic export and output screen",
    title: "Print-Ready Layouts",
    description:
      "Generate clean print layouts your shop can use immediately for production and handoff.",
  },
];

export default function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = useMemo(() => slides[activeIndex], [activeIndex]);

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-brand/25 bg-card shadow-2xl shadow-black/30">
      <div
        className="group relative"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") showNext();
          if (event.key === "ArrowLeft") showPrevious();
        }}
        onTouchStart={(event) => {
          const touchStartX = event.changedTouches[0]?.clientX;
          if (touchStartX === undefined) return;
          event.currentTarget.dataset.touchStartX = String(touchStartX);
        }}
        onTouchEnd={(event) => {
          const touchStartX = Number(
            event.currentTarget.dataset.touchStartX ?? "NaN",
          );
          const touchEndX = event.changedTouches[0]?.clientX;
          if (!Number.isFinite(touchStartX) || touchEndX === undefined) return;
          const deltaX = touchEndX - touchStartX;
          if (deltaX <= -40) showNext();
          if (deltaX >= 40) showPrevious();
          delete event.currentTarget.dataset.touchStartX;
        }}
        tabIndex={0}
        aria-label="Screenshot carousel"
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          width={1600}
          height={900}
          className="h-auto w-full"
          priority={activeIndex === 0}
        />

        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-brand/40 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground shadow transition hover:border-brand hover:text-brand"
          aria-label="Previous screenshot"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-brand/40 bg-background/80 px-3 py-2 text-sm font-semibold text-foreground shadow transition hover:border-brand hover:text-brand"
          aria-label="Next screenshot"
        >
          &gt;
        </button>
      </div>

      <div className="border-t border-brand/20 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">{slide.title}</p>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {slide.description}
            </p>
          </div>

          <div
            className="flex items-center gap-2"
            aria-label="Choose screenshot"
          >
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "bg-brand"
                    : "bg-brand/30 hover:bg-brand/55"
                }`}
                aria-label={`Show ${item.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
