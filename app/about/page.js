import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCheck, FiCompass, FiLayers, FiShield } from "react-icons/fi";

export const metadata = {
  title: "Our story - WatchWave",
  description: "The WatchWave approach to finding a watch that fits your life.",
};

const principles = [
  {
    icon: FiCompass,
    number: "01",
    title: "Clarity over pressure",
    copy: "We make the important details easy to compare, so choosing a watch feels like a decision — not a test.",
  },
  {
    icon: FiLayers,
    number: "02",
    title: "Character over sameness",
    copy: "Our edit crosses styles and routines on purpose. The right piece should feel like you, not like everyone else.",
  },
  {
    icon: FiShield,
    number: "03",
    title: "Confidence after the click",
    copy: "From first questions to delivery, we stay close enough to help you feel good about the choice.",
  },
];

const milestones = [
  ["2024", "A simple question", "What if finding a watch felt as considered as choosing one?"],
  ["2025", "The first edit", "Four families, one clear point of view and a catalog built around real life."],
  ["2026", "Still in motion", "More ways to explore, compare and find the details that make a watch yours."],
];

const About = () => {
  return (
    <main className="ww-page ww-inner-page ww-about-page">
      <section className="ww-inner-hero ww-about-hero" aria-labelledby="ww-about-title">
        <div className="ww-inner-hero-copy">
          <p className="ww-inner-kicker">
            <span /> WatchWave / our story
          </p>
          <h1 id="ww-about-title">
            Time is <em>personal.</em>
          </h1>
          <p>
            We believe the right watch is less about following a trend and more
            about noticing how you want to spend your hours.
          </p>
          <div className="ww-inner-hero-actions">
            <Link className="ww-button ww-button-light" href="/categories">
              Explore the edit <FiArrowUpRight aria-hidden="true" />
            </Link>
            <span>Independent watch retail / est. 2024</span>
          </div>
        </div>
        <div className="ww-about-hero-art" aria-hidden="true">
          <div className="ww-about-hero-disc ww-about-hero-disc-one" />
          <div className="ww-about-hero-disc ww-about-hero-disc-two" />
          <div className="ww-about-hero-watch">
            <img src="/images/cutout/l1.png" alt="" />
          </div>
          <span className="ww-about-hero-caption">A study in considered detail</span>
        </div>
      </section>

      <section className="ww-about-manifesto ww-section">
        <div className="ww-about-manifesto-mark">W</div>
        <div className="ww-about-manifesto-copy">
          <p className="ww-kicker">The WatchWave point of view</p>
          <h2>
            A watch is a small object with a <em>long presence.</em>
          </h2>
          <p>
            It marks the start of a day, the pause before a decision, the
            moment you catch yourself doing something ordinary. We started
            WatchWave to make finding that companion feel more human.
          </p>
          <p>
            So we bring together pieces with different points of view, explain
            what makes them different and leave enough room for you to decide
            with your own eyes.
          </p>
        </div>
        <div className="ww-about-manifesto-aside">
          <span>Our promise</span>
          <strong>More considered.<br />Less crowded.</strong>
        </div>
      </section>

      <section className="ww-about-principles ww-section">
        <div className="ww-section-heading">
          <div>
            <p className="ww-kicker">What guides us</p>
            <h2>
              The things that <em>matter.</em>
            </h2>
          </div>
          <p className="ww-section-heading-aside">
            A small set of principles keeps the experience clear, useful and
            grounded in the object itself.
          </p>
        </div>
        <div className="ww-about-principles-grid">
          {principles.map(({ icon: Icon, number, title, copy }) => (
            <article className="ww-about-principle" key={number}>
              <div className="ww-about-principle-top">
                <span>{number}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ww-about-timeline">
        <div className="ww-about-timeline-intro">
          <p className="ww-kicker">A short history</p>
          <h2>
            Built one good <em>question</em> at a time.
          </h2>
          <p>
            WatchWave is still evolving. The intention has stayed simple: make
            the details easier to see and the choice easier to trust.
          </p>
        </div>
        <div className="ww-about-timeline-list">
          {milestones.map(([year, title, copy]) => (
            <div className="ww-about-milestone" key={year}>
              <strong>{year}</strong>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ww-about-cta ww-section">
        <div>
          <p className="ww-kicker">Ready to find your hour?</p>
          <h2>
            There is a watch for <em>this.</em>
          </h2>
        </div>
        <div className="ww-about-cta-actions">
          <Link className="ww-button ww-button-light" href="/categories">
            Browse collections <FiArrowUpRight aria-hidden="true" />
          </Link>
          <span><FiCheck aria-hidden="true" /> No pressure, just good choices.</span>
        </div>
      </section>
    </main>
  );
};

export default About;
