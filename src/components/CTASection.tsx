import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/sx";
import { SampleCardVisual } from "@/components/VirtualCardVisual";

/* Closing moment: headline and actions in soft light, with the card
   floating in a pool of sun at the bottom of the frame. */
export function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--sx-line)" }}
    >
      <div aria-hidden="true" className="absolute inset-0 sx-stars" />
      <div aria-hidden="true" className="sx-horizon-glow" style={{ bottom: 0 }} />
      <div aria-hidden="true" className="absolute inset-0 sx-noise" />

      <div
        className="sx-container relative"
        style={{ paddingTop: "clamp(112px, 14vw, 184px)", paddingBottom: "clamp(120px, 14vw, 200px)", textAlign: "center" }}
      >
        <Reveal>
          <div className="sx-overline flex items-center justify-center" style={{ gap: 12 }}>
            <span aria-hidden="true" style={{ width: 28, height: 1, background: "var(--sx-line-strong)" }} />
            <span className="sx-accent">Banking, rebuilt</span>
            <span aria-hidden="true" style={{ width: 28, height: 1, background: "var(--sx-line-strong)" }} />
          </div>

          <h2
            className="sx-display"
            style={{ marginTop: 28, fontSize: "clamp(44px, 7.4vw, 112px)", lineHeight: 0.92 }}
          >
            Where agents
            <br />
            <span style={{ color: "var(--sx-text-3)" }}>keep their money.</span>
          </h2>

          <p className="sx-lede" style={{ maxWidth: 520, margin: "28px auto 0" }}>
            Get set up in a few minutes. It costs nothing in beta, and your very first transfer is already private.
          </p>

          <div className="flex flex-wrap items-center justify-center" style={{ marginTop: 40, gap: 12 }}>
            <Link href="/signup" className="sx-btn sx-btn-primary sx-btn-lg">
              Create your account <Arrow />
            </Link>
            <a href="https://docs.useglade.org" target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-secondary sx-btn-lg">
              Explore the docs
            </a>
          </div>
        </Reveal>

        {/* The card, floating in the light */}
        <Reveal delay={140}>
          <div className="relative flex justify-center" style={{ marginTop: "clamp(64px, 8vw, 104px)" }}>
            {/* Light pooling under the card */}
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                left: "50%",
                bottom: "-14%",
                width: "min(560px, 90%)",
                height: "38%",
                transform: "translateX(-50%)",
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(var(--sx-heat), 0.32), transparent 72%)",
                filter: "blur(18px)",
              }}
            />
            {/* The float animation owns transform, so the tilt lives on the inner box */}
            <div className="sx-float relative">
              <div style={{ width: "clamp(260px, 32vw, 420px)", transform: "perspective(1200px) rotateX(14deg) rotateZ(-6deg)" }}>
                <SampleCardVisual />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
