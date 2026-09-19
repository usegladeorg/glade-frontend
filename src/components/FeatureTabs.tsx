"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SectionHeader, Arrow } from "@/components/sx";
import { Reveal } from "@/components/Reveal";

export interface FeatureTab {
  /** Anchor id, also used by the nav (/#accounts and so on). */
  id: string;
  label: string;
  heading: string;
  description: string;
  points: string[];
  href: string;
  mockup: ReactNode;
}

/* The product, one piece at a time: a tab rail on one side and the live
   mockup for the chosen piece on the other, in a single glass frame.
   Nav anchors select the matching tab. All mockups stay mounted so
   switching is instant; only the active one is shown. */
export function FeatureTabs({ tabs }: { tabs: FeatureTab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="sx-section relative" style={{ borderTop: "1px solid var(--sx-line)" }}>
      {/* Anchor targets for the nav, just above the frame */}
      {tabs.map((t) => (
        <span key={t.id} id={t.id} aria-hidden="true" style={{ position: "absolute", top: 40 }} />
      ))}

      <div className="sx-container">
        <SectionHeader
          index="03"
          overline="Explore the product"
          align="center"
          title={
            <>
              Five parts.
              <br />
              <span style={{ color: "var(--sx-text-4)" }}>One quiet clearing.</span>
            </>
          }
          lede="Accounts, privacy, agents, routing and disclosure, all on one protocol. Pick a part to see it working."
        />

        <Reveal delay={100}>
          <div
            className="sx-card-solid grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]"
            style={{ marginTop: "clamp(40px, 6vw, 72px)", borderRadius: "var(--sx-r-2xl)", padding: "clamp(10px, 1.2vw, 14px)", gap: "clamp(10px, 1.2vw, 14px)" }}
          >
            {/* Tab rail */}
            <div
              role="tablist"
              aria-label="Product areas"
              aria-orientation="vertical"
              className="flex lg:flex-col overflow-x-auto lg:overflow-visible"
              style={{ gap: 6, padding: 6, scrollbarWidth: "none" }}
            >
              {tabs.map((t, i) => {
                const on = t.id === active;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActive(t.id)}
                    className="text-left"
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      border: "1px solid",
                      borderColor: on ? "var(--sx-glass-edge)" : "transparent",
                      borderRadius: 20,
                      padding: "14px 18px",
                      background: on ? "rgba(255, 255, 255, 0.92)" : "transparent",
                      boxShadow: on ? "var(--sx-shadow-sm)" : "none",
                      cursor: "pointer",
                      transition: "background-color 0.3s var(--sx-ease), box-shadow 0.3s var(--sx-ease)",
                    }}
                  >
                    <div className="flex items-center" style={{ gap: 12 }}>
                      <span
                        className="sx-num flex items-center justify-center"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 999,
                          fontSize: 13,
                          flexShrink: 0,
                          color: on ? "var(--sx-on-accent)" : "var(--sx-text-3)",
                          background: on ? "var(--sx-accent-grad)" : "var(--sx-inset)",
                          boxShadow: on ? "var(--sx-accent-glow)" : "none",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 15.5, fontWeight: 650, color: on ? "var(--sx-text)" : "var(--sx-text-2)", whiteSpace: "nowrap" }}>
                        {t.label}
                      </span>
                    </div>
                    {/* Detail opens under the active tab on wide screens */}
                    {on && (
                      <div className="hidden lg:block sx-rise" style={{ paddingLeft: 42, animationDuration: "0.5s" }}>
                        <p className="sx-small" style={{ marginTop: 10, color: "var(--sx-text-2)", lineHeight: 1.6 }}>
                          {t.description}
                        </p>
                        {t.points.length > 0 && (
                          <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {t.points.map((p) => (
                              <li key={p} className="sx-tag" style={{ textTransform: "none", letterSpacing: 0, fontSize: 12, fontWeight: 600 }}>
                                {p}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
              <a href={current.href} className="sx-btn sx-btn-quiet sx-btn-sm hidden lg:inline-flex" style={{ alignSelf: "flex-start", marginTop: 6, marginLeft: 8 }}>
                More on {current.label.toLowerCase()} <Arrow size={12} />
              </a>
            </div>

            {/* Stage: heading over the mockup */}
            <div
              style={{
                position: "relative",
                borderRadius: "calc(var(--sx-r-2xl) - 10px)",
                background: "linear-gradient(170deg, rgba(222, 244, 233, 0.9), rgba(238, 245, 241, 0.6))",
                border: "1px solid var(--sx-line)",
                padding: "clamp(18px, 3vw, 36px)",
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              {tabs.map((t) => (
                <div
                  key={t.id}
                  role="tabpanel"
                  id={`panel-${t.id}`}
                  aria-labelledby={`tab-${t.id}`}
                  hidden={t.id !== active}
                  className="relative"
                >
                  <h3 className="sx-h3" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", maxWidth: 560, textWrap: "balance" }}>
                    {t.heading}
                  </h3>
                  {/* On small screens the description lives here, not in the rail */}
                  <p className="sx-small lg:hidden" style={{ marginTop: 10, color: "var(--sx-text-2)" }}>
                    {t.description}
                  </p>
                  <div className="sx-rise" style={{ marginTop: "clamp(20px, 3vw, 32px)", animationDuration: "0.6s" }}>
                    {t.mockup}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
