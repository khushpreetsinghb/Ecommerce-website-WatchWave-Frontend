"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

const FALLBACK_STUDY_IMAGE = "/images/cutout/m1.png";
const STAGE_COUNT = 4;
const STAGE_LABELS = ["The silhouette", "The profile", "The detail", "The whole"];

const PHASES = [
  {
    number: "01",
    label: "The silhouette",
    title: "Start with the whole.",
    body: "Before the details, there is the proportion — the quiet confidence of a case, a dial and a strap finding their balance.",
  },
  {
    number: "02",
    label: "The perspective",
    title: "Watch the light move.",
    body: "Scroll through the study and watch the same timepiece turn, catch a different reflection and reveal the character of its finish.",
  },
  {
    number: "03",
    label: "The architecture",
    title: "Good design comes apart well.",
    body: "The face, case and strap separate into a simple exploded view. Every part has a purpose. Every detail earns its place.",
  },
  {
    number: "04",
    label: "The return",
    title: "Every detail, back in balance.",
    body: "The pieces settle back together — a reminder that the best technology still leaves room for character.",
  },
];

const clamp = (value, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

const WatchScrollStory = ({ image, name = "WatchWave timepiece" }) => {
  const sectionRef = useRef(null);
  const progressFillRef = useRef(null);
  const [stage, setStage] = useState({ index: 0, phase: 0 });
  const studySrc = image || FALLBACK_STUDY_IMAGE;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let target = 0;
    let smooth = 0;
    let frame = 0;
    let lastIndex = -1;
    let lastPhase = -1;
    let active = true;

    const readTarget = () => {
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      target = clamp(-bounds.top / travel);
    };

    const apply = (value) => {
      const explosion = clamp((value - 0.28) / 0.52);
      const returnToWhole = clamp((value - 0.8) / 0.2);
      const exploded = explosion * (1 - returnToWhole);

      section.style.setProperty("--ww-watch-sequence-opacity", `${1 - exploded}`);
      section.style.setProperty("--ww-watch-rotate", `${-8 + value * 25}deg`);
      section.style.setProperty("--ww-watch-tilt", `${4 - value * 9}deg`);
      section.style.setProperty(
        "--ww-watch-scale",
        `${0.96 + Math.sin(value * Math.PI) * 0.06}`
      );
      section.style.setProperty("--ww-watch-explosion", `${exploded}`);
      section.style.setProperty(
        "--ww-watch-shadow-opacity",
        `${0.38 + exploded * 0.2}`
      );
      section.style.setProperty(
        "--ww-watch-dial-offset",
        `${Math.round(explosion * 150)}px`
      );
      section.style.setProperty(
        "--ww-watch-case-offset",
        `${Math.round(explosion * 76)}px`
      );
      section.style.setProperty(
        "--ww-watch-strap-offset",
        `${Math.round(explosion * 140)}px`
      );

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${value * 100}%`;
      }
    };

    const tick = () => {
      if (!active) return;
      smooth += (target - smooth) * 0.14;
      if (Math.abs(target - smooth) < 0.0004) smooth = target;
      apply(smooth);

      const index = Math.min(
        STAGE_COUNT - 1,
        Math.max(0, Math.floor(smooth * (STAGE_COUNT - 1)))
      );
      const phase = Math.min(
        PHASES.length - 1,
        Math.max(0, Math.floor(smooth * PHASES.length))
      );
      if (index !== lastIndex || phase !== lastPhase) {
        lastIndex = index;
        lastPhase = phase;
        setStage({ index, phase });
      }
      frame = window.requestAnimationFrame(tick);
    };

    readTarget();
    smooth = target;
    apply(smooth);
    frame = window.requestAnimationFrame(tick);
    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
    };
  }, []);

  const phase = PHASES[stage.phase];

  const handleImageError = (event) => {
    if (event.currentTarget.src.endsWith(FALLBACK_STUDY_IMAGE)) return;
    event.currentTarget.src = FALLBACK_STUDY_IMAGE;
  };

  return (
    <section
      className="ww-3d-section"
      id="craft"
      ref={sectionRef}
      aria-labelledby="ww-3d-title"
    >
      <div className="ww-3d-sticky">
        <div className="ww-3d-topline">
          <span>WatchWave / object study</span>
          <span>Scroll to inspect</span>
        </div>

        <div className="ww-3d-layout">
          <div className="ww-3d-copy">
            <p className="ww-3d-kicker">
              <span /> {phase.number} / 04 · {phase.label}
            </p>
            <div className="ww-3d-phase-copy" key={phase.number}>
              <h2 id="ww-3d-title">{phase.title}</h2>
              <p>{phase.body}</p>
            </div>
            <div className="ww-3d-phase-list" aria-label="Watch study chapters">
              {PHASES.map((item, index) => (
                <div
                  className={index === stage.phase ? "is-active" : ""}
                  key={item.number}
                >
                  <span>{item.number}</span>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
            <Link className="ww-3d-link" href="/categories">
              View the collection <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div
            className="ww-3d-stage"
            role="img"
            aria-label={`Scroll-driven 3D-style study of ${name}`}
          >
            <div className="ww-3d-stage-grid" aria-hidden="true" />
            <div className="ww-3d-orbit ww-3d-orbit-outer" aria-hidden="true" />
            <div className="ww-3d-orbit ww-3d-orbit-inner" aria-hidden="true" />
            <div className="ww-3d-axis" aria-hidden="true" />

            <div className="ww-3d-watch" aria-hidden="true">
              <div className="ww-3d-watch-shadow" />
              <div className="ww-3d-sequence">
                <img
                  src={studySrc}
                  alt=""
                  onError={handleImageError}
                />
              </div>
              <div className="ww-3d-exploded">
                <img
                  className="ww-3d-piece ww-3d-piece-shadow"
                  src={studySrc}
                  alt=""
                  onError={handleImageError}
                />
                <img
                  className="ww-3d-piece ww-3d-piece-dial"
                  src={studySrc}
                  alt=""
                  onError={handleImageError}
                />
                <img
                  className="ww-3d-piece ww-3d-piece-case"
                  src={studySrc}
                  alt=""
                  onError={handleImageError}
                />
                <img
                  className="ww-3d-piece ww-3d-piece-strap"
                  src={studySrc}
                  alt=""
                  onError={handleImageError}
                />
              </div>
            </div>

            <div className="ww-3d-callout ww-3d-callout-top">
              <span /> case profile
            </div>
            <div className="ww-3d-callout ww-3d-callout-bottom">
              <span /> dial / 01
            </div>
          </div>
        </div>

        <div className="ww-3d-bottomline">
          <div className="ww-3d-progress" aria-hidden="true">
            <span ref={progressFillRef} />
          </div>
          <div className="ww-3d-scroll-cue">
            <FiArrowDown aria-hidden="true" />
            <span>{STAGE_LABELS[stage.index]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchScrollStory;
