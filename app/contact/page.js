import React from "react";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";

export const metadata = {
  title: "Contact us - WatchWave",
  description: "Talk to the WatchWave team about a watch, an order or your next timepiece.",
};

const contactDetails = [
  {
    icon: FiMail,
    label: "Email",
    value: "help@watchwave.com",
    href: "mailto:help@watchwave.com",
    note: "We usually reply within one working day.",
  },
  {
    icon: FiPhone,
    label: "Call",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    note: "Monday to Saturday / 10:00–18:00 IST",
  },
  {
    icon: FiMapPin,
    label: "Write to us",
    value: "WatchWave Studio",
    href: null,
    note: "Online, with care wherever you are.",
  },
];

const Contact = () => {
  return (
    <main className="ww-page ww-inner-page ww-contact-page">
      <section className="ww-inner-hero ww-contact-hero" aria-labelledby="ww-contact-title">
        <div className="ww-inner-hero-copy">
          <p className="ww-inner-kicker">
            <span /> WatchWave / contact
          </p>
          <h1 id="ww-contact-title">
            Let&apos;s talk <em>time.</em>
          </h1>
          <p>
            Questions about a piece, an order or the details that help you
            choose well? Send a note. A real person is here to help.
          </p>
          <div className="ww-inner-hero-actions">
            <a className="ww-button ww-button-light" href="mailto:help@watchwave.com">
              Email the team <FiArrowUpRight aria-hidden="true" />
            </a>
            <span>Thoughtful answers, no hard sell.</span>
          </div>
        </div>
        <div className="ww-contact-hero-art" aria-hidden="true">
          <div className="ww-contact-hero-orbit ww-contact-hero-orbit-one" />
          <div className="ww-contact-hero-orbit ww-contact-hero-orbit-two" />
          <div className="ww-contact-hero-watch ww-contact-hero-watch-back">
            <img src="/images/cutout/s1.png" alt="" />
          </div>
          <div className="ww-contact-hero-watch ww-contact-hero-watch-front">
            <img src="/images/cutout/m1.png" alt="" />
          </div>
          <span className="ww-contact-hero-note">Open line / 01</span>
        </div>
      </section>

      <section className="ww-contact-main ww-section">
        <div className="ww-contact-intro">
          <p className="ww-kicker">Start a conversation</p>
          <h2>
            Pick the route that feels <em>right.</em>
          </h2>
          <p>
            Whether you are choosing your first watch or checking an order,
            we would rather answer clearly than send you in circles.
          </p>
          <div className="ww-contact-availability">
            <FiClock aria-hidden="true" />
            <span><strong>Usually online</strong> Monday–Saturday, 10:00–18:00 IST</span>
          </div>
        </div>
        <div className="ww-contact-details">
          {contactDetails.map(({ icon: Icon, label, value, href, note }) => {
            const content = (
              <>
                <div className="ww-contact-detail-icon"><Icon aria-hidden="true" /></div>
                <div className="ww-contact-detail-copy">
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
                {href && <FiArrowUpRight className="ww-contact-detail-arrow" aria-hidden="true" />}
              </>
            );

            return href ? (
              <a className="ww-contact-detail" href={href} key={label}>
                {content}
              </a>
            ) : (
              <div className="ww-contact-detail" key={label}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="ww-contact-note-band">
        <div className="ww-contact-note-mark"><FiMessageCircle aria-hidden="true" /></div>
        <div>
          <p className="ww-kicker">A useful first message</p>
          <h2>
            Tell us what you are <em>looking for.</em>
          </h2>
          <p>
            A style, a budget, a wrist size or simply the watch you keep thinking
            about — give us something to start with and we will help you narrow
            the edit.
          </p>
        </div>
        <a className="ww-button ww-button-light" href="mailto:help@watchwave.com?subject=My%20WatchWave%20watch%20search">
          Start an email <FiArrowUpRight aria-hidden="true" />
        </a>
      </section>

      <section className="ww-contact-footer-cta ww-section">
        <div>
          <p className="ww-kicker">Not sure where to begin?</p>
          <h2>
            Browse first. Ask <em>anything.</em>
          </h2>
        </div>
        <Link className="ww-button ww-button-dark" href="/categories">
          Explore collections <FiArrowUpRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
};

export default Contact;
