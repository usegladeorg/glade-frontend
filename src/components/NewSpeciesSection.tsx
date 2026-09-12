import { Reveal } from "@/components/Reveal";

const SIGNALS = [
  { label: "Non-custodial", d: "M8 1.5l5 2v4c0 3.2-2.2 5.6-5 6.5-2.8-.9-5-3.3-5-6.5v-4l5-2z" },
  { label: "Confidential", d: "M4.5 7V5.5a3.5 3.5 0 0 1 7 0V7M3.5 7h9v6.5h-9z" },
  { label: "Checked on Robinhood Chain", d: "M3.5 8.5l3 3 6-7" },
];

/* The statement: one centered sentence about the moment, with the three
   promises as glass pills and the short pitch beneath. */
export function NewSpeciesSection() {
  return (
    <section className="sx-section relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 sx-stars" style={{ opacity: 0.5 }} />
      {/* A pool of canopy light behind the statement */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: "min(1200px, 120vw)",
          height: "80%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(var(--sx-heat), 0.16), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="sx-container relative" style={{ textAlign: "center" }}>
        <Reveal>
          <div className="sx-overline flex items-center justify-center" style={{ gap: 12 }}>
            <span className="sx-accent">01</span>
            <span aria-hidden="true" style={{ width: 28, height: 1, background: "var(--sx-line-strong)" }} />
            <span>Agents with wallets</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="sx-h2"
            style={{ margin: "28px auto 0", maxWidth: 1100, fontSize: "clamp(40px, 7.2vw, 116px)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
          >
            <span style={{ color: "var(--sx-text-4)" }}>Software now has</span>
            <br />
            its own <span className="sx-gleam">bank accounts.</span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <ul className="flex flex-wrap items-center justify-center" style={{ listStyle: "none", margin: "40px 0 0", padding: 0, gap: 10 }}>
            {SIGNALS.map((s) => (
              <li
                key={s.label}
                className="sx-card flex items-center"
                style={{ gap: 10, height: 44, padding: "0 18px 0 8px", borderRadius: 999, fontSize: 14, fontWeight: 600 }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{ width: 30, height: 30, borderRadius: 999, background: "var(--sx-accent-surface)", color: "var(--sx-accent)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d={s.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {s.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <p
            style={{
              margin: "40px auto 0",
              maxWidth: 760,
              fontSize: "clamp(18px, 1.7vw, 23px)",
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
              color: "var(--sx-text-3)",
              textWrap: "pretty",
            }}
          >
            <span style={{ color: "var(--sx-text)" }}>
              Right now, AI agents are earning, spending and settling with one another at every hour of the day.
            </span>{" "}
            Glade gives them a private place to do it: a non-custodial neobank where people and agents move money
            confidentially, with each settlement checked on Robinhood Chain.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
