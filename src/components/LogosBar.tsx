/* Each mark is drawn through a CSS mask, so every logo takes the same ink
   colour whatever its source format, and warms to the accent on hover. */
const PARTNERS = [
  { name: "Robinhood Chain", file: "robinhood.svg", w: 38, h: 38 },
  { name: "Chainlink", file: "chainlink.svg", w: 36, h: 36 },
  { name: "USDG", file: "usdg.png", w: 36, h: 36 },
  { name: "Safe", file: "safe.svg", w: 40, h: 40 },
  { name: "Uniswap", file: "uniswap.svg", w: 44, h: 44 },
  { name: "Morpho", file: "morpho.svg", w: 40, h: 37 },
  { name: "Foundry", file: "foundry.png", w: 44, h: 44 },
  { name: "x402", file: "x402.svg", w: 84, h: 32 },
];

export function LogosBar() {
  return (
    <section
      aria-label="Integrations"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--sx-line)",
        borderBottom: "1px solid var(--sx-line)",
      }}
    >
      <div className="sx-container flex flex-col md:flex-row md:items-stretch">
        {/* Label block */}
        <div
          className="flex flex-col justify-center md:border-r pt-7 md:pb-7"
          style={{
            gap: 10,
            borderColor: "var(--sx-line)",
            flexShrink: 0,
          }}
        >
          <div className="sx-overline flex items-center" style={{ gap: 10 }}>
            <span className="sx-dot sx-dot-accent" />
            <span>Built on / works with</span>
          </div>
          <p className="sx-small" style={{ margin: 0, maxWidth: 260, paddingRight: 32 }}>
            Wired into the infrastructure agents already use
          </p>
        </div>

        {/* Seamless marquee: the track renders the partner list twice and
            scrolls by exactly half its width per loop. */}
        <div
          className="relative flex items-center"
          style={{
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            padding: "28px 0",
            maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <div className="sx-marquee" style={{ animationDuration: "60s" }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={`${p.name}-${i}`}
                aria-hidden={i >= PARTNERS.length ? true : undefined}
                className="group flex items-center justify-center"
                title={p.name}
                style={{ flexShrink: 0, padding: "0 clamp(28px, 3.4vw, 52px)" }}
              >
                <span className="sr-only">{p.name}</span>
                <span
                  aria-hidden="true"
                  className="transition-colors duration-300 bg-[rgba(14,42,32,0.42)] group-hover:bg-[var(--sx-accent)]"
                  style={{
                    display: "block",
                    width: p.w,
                    height: p.h,
                    WebkitMask: `url(/images/partners/${p.file}) center / contain no-repeat`,
                    mask: `url(/images/partners/${p.file}) center / contain no-repeat`,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
