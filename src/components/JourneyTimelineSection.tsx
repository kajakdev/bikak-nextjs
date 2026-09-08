"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type JourneyStep = {
  number: number;
  title: string;
  description: string;
  bullets?: string[];
  closing?: string;
  imageSrc: string;
  imageAlt: string;
};

type JourneyTimelineSectionProps = {
  steps: JourneyStep[];
};

export function JourneyTimelineSection({
  steps,
}: JourneyTimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
        Mikor induljon a feltöltés:
        amikor a section teteje kb. a viewport 70%-ához ér.

        Mikor legyen kész:
        amikor a section alja kb. a viewport 30%-ához ér.
      */
      const start = viewportHeight * 0.7;
      const end = viewportHeight * 0.3;

      const totalDistance = rect.height + start - end;
      const travelled = start - rect.top;

      const nextProgress = Math.min(
        Math.max(travelled / totalDistance, 0),
        1
      );

      setProgress(nextProgress);

      /*
        A piros vonal aktuális vége pixelben,
        a section tetejétől számítva.
      */
      const fillPosition = nextProgress * rect.height;

      /*
        Megnézzük a markerek tényleges DOM pozícióját.
        Így nem becsült százalék alapján váltanak át.
      */
      const markers =
        section.querySelectorAll<HTMLElement>(
          "[data-timeline-marker]"
        );

      const active: number[] = [];

      markers.forEach((marker) => {
        const markerRect = marker.getBoundingClientRect();

        const markerTop =
          markerRect.top - rect.top;

        const stepNumber = Number(
          marker.dataset.step
        );

        if (fillPosition >= markerTop) {
          active.push(stepNumber);
        }
      });

      setActiveSteps(active);
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24"
    >
      <div className="container-site">
        <div className="mx-auto max-w-[1180px]">
          <div className="relative">

            {/* TIMELINE BACKGROUND */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-1/2
                top-0
                z-0
                hidden
                w-[4px]
                -translate-x-1/2
                bg-white
                lg:block
              "
            >
              {/* RED FILL */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  w-full
                  bg-red
                  transition-[height]
                  duration-100
                  ease-linear
                "
                style={{
                  height: `${progress * 100}%`,
                }}
              />
            </div>

            {/* STEPS */}
            <div className="flex flex-col gap-20 lg:gap-28">
              {steps.map((step, index) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                  index={index}
                  isActive={activeSteps.includes(
                    step.number
                  )}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

type TimelineStepProps = {
  step: JourneyStep;
  index: number;
  isActive: boolean;
};

function TimelineStep({
  step,
  index,
  isActive,
}: TimelineStepProps) {
  const imageOnLeft = index % 2 === 0;

  return (
    <article
      className="
        relative
        grid
        items-center
        gap-8
        lg:grid-cols-[1fr_80px_1fr]
        lg:gap-10
      "
    >
      {/* LEFT SIDE */}
      <div className="lg:col-start-1 lg:row-start-1">
        {imageOnLeft ? (
          <StepImage step={step} />
        ) : (
          <StepContent step={step} />
        )}
      </div>

      {/* MARKER */}
      <div
        data-timeline-marker
        data-step={step.number}
        className="
          absolute
          left-1/2
          top-0
          z-20
          hidden
          -translate-x-1/2
          lg:block
        "
      >
        <TimelineMarker
          number={step.number}
          active={isActive}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:col-start-3 lg:row-start-1">
        {imageOnLeft ? (
          <StepContent step={step} />
        ) : (
          <StepImage step={step} />
        )}
      </div>
    </article>
  );
}

type TimelineMarkerProps = {
  number: number;
  active: boolean;
};

function TimelineMarker({
  number,
  active,
}: TimelineMarkerProps) {
  return (
    <div
      className={`
        relative
        flex
        size-[56px]
        items-center
        justify-center
        rounded-full
        border-[4px]
        bg-foreground
        transition-colors
        duration-200
        ${
          active
            ? "border-red"
            : "border-white"
        }
      `}
    >
      <div
        className={`
          flex
          size-[44px]
          items-center
          justify-center
          rounded-full
          text-[20px]
          font-extrabold
          leading-none
          transition-colors
          duration-200
          ${
            active
              ? "bg-red text-black"
              : "bg-white text-black"
          }
        `}
      >
        {number}
      </div>
    </div>
  );
}

function StepImage({
  step,
}: {
  step: JourneyStep;
}) {
  return (
    <div
      className="
        relative
        mx-auto
        aspect-[4/5]
        w-full
        max-w-[380px]
        overflow-hidden
        rounded-[20px]
      "
    >
      <Image
        src={step.imageSrc}
        alt={step.imageAlt}
        fill
        className="object-cover"
        sizes="
          (max-width: 1024px) 100vw,
          380px
        "
      />
    </div>
  );
}

function StepContent({
  step,
}: {
  step: JourneyStep;
}) {
  return (
    <div className="text-white">
      <h3 className="text-xl font-extrabold uppercase leading-tight lg:text-2xl">
        {step.title}
      </h3>

      <p className="mt-2 leading-relaxed text-white/90">
        {step.description}
      </p>

      {step.bullets &&
        step.bullets.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed text-white/90">
            {step.bullets.map(
              (bullet, index) => (
                <li key={`${bullet}-${index}`}>
                  {bullet}
                </li>
              )
            )}
          </ul>
        )}

      {step.closing && (
        <p className="mt-2 leading-relaxed text-white/90">
          {step.closing}
        </p>
      )}
    </div>
  );
}