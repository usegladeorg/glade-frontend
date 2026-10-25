import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Arrow } from "@/components/sx";
import { TokenBadge } from "@/components/TokenBadge";


/* The hero is centered copy over the valley photograph, with a "canopy
   window" below it: a wide pane of frosted glass with a live payment card
   at its center and the moving parts of the product floating around it. */
export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ paddingTop: "clamp(112px, 15vh, 150px)" }}>
      {/* The valley, under a morning mist that keeps the headline legible
          and lifts away toward the bottom of the frame */}
      <Image
        src="/images/hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(240, 247, 243, 0.94) 0%, rgba(240, 247, 243, 0.86) 24%, rgba(240, 247, 243, 0.55) 44%, rgba(240, 247, 243, 0.12) 64%, rgba(240, 247, 243, 0) 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0"
        style={{ height: 160, background: "linear-gradient(180deg, rgba(238, 245, 241, 0), var(--sx-bg))" }}
      />
      <div aria-hidden="true" className="absolute inset-0 sx-stars" style={{ opacity: 0.7 }} />

      <div className="sx-container relative" style={{ textAlign: "center" }}>
        <div className="sx-rise flex justify-center" style={{ marginBottom: 28 }}>
          <TokenBadge />
        </div>

        <h1
          className="sx-display sx-rise sx-d1"
          style={{ margin: "0 auto", maxWidth: 1080, fontSize: "clamp(44px, 7vw, 108px)", lineHeight: 0.98 }}
        >
          Private banking for people
          <br className="hidden sm:block" /> and <span className="sx-gleam">the agents they run.</span>
        </h1>

        <p className="sx-lede sx-rise sx-d2" style={{ margin: "26px auto 0", maxWidth: 620 }}>
          Transfers are encrypted before they leave your account and settle in 100ms blocks. Every agent gets an
          account of its own, pays over x402, and can never spend a cent past the limits you set.
        </p>

        <div className="sx-rise sx-d3 flex flex-wrap items-center justify-center" style={{ marginTop: 36, gap: 12 }}>
          <Link href="/signup" className="sx-btn sx-btn-primary sx-btn-lg">
            Get your account <Arrow />
          </Link>
          <a href="https://docs.useglade.org" target="_blank" rel="noopener noreferrer" className="sx-btn sx-btn-secondary sx-btn-lg">
            Browse the docs
          </a>
        </div>

        <CanopyWindow />
      </div>
    </section>
  );
}

/* ── The canopy window: frosted glass over the valley ────────────────────── */

function CanopyWindow() {
  return (
    <div
      className="sx-rise sx-d4 relative overflow-hidden"
      style={{
        marginTop: "clamp(48px, 7vw, 80px)",
        marginBottom: "clamp(56px, 8vw, 96px)",
        borderRadius: "clamp(28px, 3vw, 44px)",
        border: "0px solid var(--sx-glass-edge)",
        boxShadow: "0 40px 90px -30px rgba(6, 40, 26, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08))",
        backdropFilter: "blur(4px) saturate(125%)",
        WebkitBackdropFilter: "blur(4px) saturate(125%)",
        textAlign: "left",
      }}
    >

      <div className="relative flex flex-col items-center" style={{ minHeight: "clamp(520px, 52vw, 680px)", padding: "clamp(28px, 5vw, 64px) 16px 0" }}>
        {/* Floating parts, around the card on wide screens */}
        <Chip style={{ left: "6%", top: "13%" }} delay={0}>
          <ChipHead label="Agent" tag="datafetch.glade" />
          <div className="flex items-baseline justify-between" style={{ marginTop: 10, gap: 12 }}>
            <span className="sx-num" style={{ fontSize: 22 }}>$12.40</span>
            <span className="sx-caption">of $50.00 today</span>
          </div>
          <div className="sx-meter" style={{ marginTop: 10 }}><span style={{ width: "25%" }} /></div>
        </Chip>

        <Chip style={{ right: "6%", top: "10%" }} delay={-2.5}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <Check />
            <div>
              <div style={{ fontSize: 14, fontWeight: 650 }}>Settled in 102ms</div>
              <div className="sx-caption">Block 4,281,907 · final</div>
            </div>
          </div>
        </Chip>

        <Chip style={{ left: "9%", bottom: "26%" }} delay={-4}>
          <ChipHead label="View key" tag="Read-only" />
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>auditor.glade</div>
          <div className="sx-caption" style={{ marginTop: 2 }}>Sees Q1 transfers, nothing else</div>
        </Chip>

        <Chip style={{ right: "8%", bottom: "30%" }} delay={-1.2}>
          <ChipHead label="x402" tag="200 OK" ok />
          <div className="sx-mono" style={{ marginTop: 10, color: "var(--sx-text-2)" }}>GET api.marketfeed.io</div>
          <div className="sx-caption" style={{ marginTop: 2 }}>Paid 0.25 USDG, inside policy</div>
        </Chip>

        <PaymentCard />
      </div>
    </div>
  );
}

/** The focal point: one confidential transfer, mid-flight. */
function PaymentCard() {
  return (
    <div
      className="sx-card-solid sx-hud"
      style={{
        width: "min(380px, 100%)",
        marginTop: "clamp(8px, 3vw, 40px)",
        marginBottom: "clamp(24px, 4vw, 48px)",
        padding: 22,
        borderRadius: 28,
        boxShadow: "var(--sx-shadow-lg)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center" style={{ gap: 8, fontSize: 13.5, fontWeight: 650 }}>
          <span className="sx-dot sx-dot-live" /> Sending
        </span>
        <span className="sx-tag sx-tag-accent">Confidential</span>
      </div>

      <div className="flex items-center" style={{ gap: 12, marginTop: 20 }}>
        <span
          aria-hidden="true"
          className="flex items-center justify-center"
          style={{ width: 40, height: 40, borderRadius: 14, background: "var(--sx-accent-grad)", color: "#fff", fontWeight: 700, fontSize: 15 }}
        >
          V
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 650 }}>vendor.glade</div>
          <div className="sx-caption">from alice.glade · Invoice #2210</div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: "16px 18px", borderRadius: 18, background: "var(--sx-inset)" }}>
        <div className="sx-overline" style={{ fontSize: 10 }}>You send</div>
        <div className="flex items-baseline" style={{ gap: 8, marginTop: 8 }}>
          <span className="sx-num" style={{ fontSize: 40, lineHeight: 1 }}>$1,240.50</span>
          <span className="sx-overline" style={{ fontSize: 10 }}>USDG</span>
        </div>
        <div className="flex items-center" style={{ gap: 10, marginTop: 14 }}>
          <span className="sx-overline" style={{ fontSize: 9.5, color: "var(--sx-text-4)", whiteSpace: "nowrap" }}>On-chain</span>
          <span
            aria-hidden="true"
            style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              background: "repeating-linear-gradient(90deg, rgba(var(--sx-ink), 0.18) 0 4px, transparent 4px 7px)",
            }}
          />
          <span className="sx-mono" style={{ fontSize: 11, color: "var(--sx-text-3)" }}>encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: 10, marginTop: 14 }}>
        <Mini label="Fee" value="$0.00" />
        <Mini label="Range proof" value="Valid" ok />
      </div>
    </div>
  );
}

function Mini({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div style={{ padding: "10px 12px", borderRadius: 14, border: "1px solid var(--sx-line)", background: "rgba(255,255,255,0.6)" }}>
      <div className="sx-overline" style={{ fontSize: 9.5 }}>{label}</div>
      <div style={{ marginTop: 5, fontSize: 14, fontWeight: 650, color: ok ? "var(--sx-ok)" : "var(--sx-text)" }}>{value}</div>
    </div>
  );
}

function Chip({ children, style, delay }: { children: ReactNode; style: CSSProperties; delay: number }) {
  return (
    <div aria-hidden="true" className="absolute hidden lg:block" style={style}>
      <div
        className="sx-card sx-hud sx-float"
        style={{ width: 236, padding: "14px 16px", borderRadius: 20, boxShadow: "var(--sx-shadow)", animationDelay: `${delay}s`, animationDuration: "8s" }}
      >
        {children}
      </div>
    </div>
  );
}

function ChipHead({ label, tag, ok }: { label: string; tag: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between" style={{ gap: 8 }}>
      <span className="sx-overline" style={{ fontSize: 10 }}>{label}</span>
      <span className={`sx-tag ${ok ? "sx-tag-ok" : ""}`} style={{ height: 20, fontSize: 9.5, padding: "0 8px", textTransform: ok ? "uppercase" : "none", letterSpacing: ok ? undefined : 0 }}>
        {tag}
      </span>
    </div>
  );
}

function Check() {
  return (
    <span
      className="flex items-center justify-center"
      style={{ width: 34, height: 34, borderRadius: 12, background: "var(--sx-ok-bg)", color: "var(--sx-ok)", flexShrink: 0 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
