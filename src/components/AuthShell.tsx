import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/sx";

function BackLink() {
  return (
    <Link href="/" className="sx-btn sx-btn-secondary sx-btn-sm" style={{ paddingLeft: 12, paddingRight: 14, gap: 8 }}>
      <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 8H3M7 4 3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Return to site
    </Link>
  );
}

/**
 * Shared frame for the auth pages: the valley photograph under a light
 * mist fills the screen, and one frosted card floats in the middle. When a
 * page passes `aside`, the card opens a window onto the valley beside the
 * form, carrying the pitch; without it the card is a
 * single narrow column, used for confirmations.
 */
export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  aside,
  width = 440,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  aside?: { heading: ReactNode; points: string[] };
  width?: number;
}) {
  return (
    <div className="relative w-full flex flex-col" style={{ flex: 1, minHeight: "100svh", overflow: "hidden" }}>
      {/* The valley, misted over so the card reads as the subject */}
      <Image
        src="/images/hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%", filter: "blur(6px) saturate(115%)", transform: "scale(1.04)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(238, 246, 241, 0.86), rgba(238, 246, 241, 0.7) 50%, rgba(238, 246, 241, 0.82))" }}
      />
      <div aria-hidden="true" className="absolute inset-0 sx-stars" style={{ opacity: 0.6 }} />

      <header className="relative flex items-center justify-between" style={{ padding: "clamp(16px, 3vw, 28px) clamp(16px, 4vw, 48px)" }}>
        <Link href="/" aria-label="Go to the Glade homepage" style={{ textDecoration: "none" }}>
          <Brand size={30} />
        </Link>
        <BackLink />
      </header>

      <main
        className="relative flex flex-col items-center justify-center"
        style={{ flex: 1, padding: "clamp(8px, 2vh, 24px) clamp(12px, 3vw, 32px) clamp(32px, 6vh, 64px)" }}
      >
        <div
          className={`sx-rise w-full grid ${aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" : ""}`}
          style={{
            maxWidth: aside ? 1080 : width + 48,
            padding: 10,
            gap: 10,
            borderRadius: "clamp(28px, 3vw, 40px)",
            background: "linear-gradient(160deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.36))",
            border: "1px solid var(--sx-glass-edge)",
            boxShadow: "0 40px 100px -40px rgba(10, 60, 38, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
          }}
        >
          {/* The window onto the valley: a banner above the form on small
              screens, the right half of the card on wide ones */}
          {aside && <ValleyWindow aside={aside} />}

          {/* The form */}
          <section
            className="lg:order-first flex flex-col justify-center"
            style={{
              padding: "clamp(24px, 4vw, 48px) clamp(20px, 3.6vw, 44px)",
              borderRadius: "clamp(20px, 2.4vw, 30px)",
              background: "rgba(255, 255, 255, 0.86)",
              boxShadow: "var(--sx-shadow-sm)",
            }}
          >
            <div style={{ width: "100%", maxWidth: width, margin: "0 auto" }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "var(--sx-accent)" }}>{eyebrow}</p>
              <h1
                style={{
                  marginTop: 10,
                  fontFamily: "var(--sx-display)",
                  fontWeight: 450,
                  fontSize: "clamp(32px, 3vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  fontVariationSettings: "\"SOFT\" 100",
                  color: "var(--sx-text)",
                  textWrap: "balance",
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="sx-body" style={{ marginTop: 12, fontSize: 15 }}>
                  {subtitle}
                </p>
              )}
              <div style={{ marginTop: 30 }}>{children}</div>

              {footer && (
                <div
                  className="sx-small [&_a]:text-[var(--sx-accent)] [&_a]:font-semibold [&_a]:underline [&_a]:decoration-[var(--sx-accent-line)] [&_a]:underline-offset-4 hover:[&_a]:decoration-[var(--sx-accent)]"
                  style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid var(--sx-line)", textAlign: "center" }}
                >
                  {footer}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ValleyWindow({ aside }: { aside: { heading: ReactNode; points: string[] } }) {
  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{ borderRadius: "clamp(20px, 2.4vw, 30px)", minHeight: "clamp(200px, 30vw, 620px)", isolation: "isolate" }}
    >
      <Image
        src="/images/hero.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        style={{ objectFit: "cover", objectPosition: "center 45%", zIndex: -2 }}
      />
      {/* Shade the bottom so the white type reads over the lake */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ zIndex: -1, background: "linear-gradient(180deg, rgba(4, 30, 20, 0.05) 0%, rgba(4, 30, 20, 0.2) 40%, rgba(4, 30, 20, 0.78) 100%)" }}
      />

      <div className="flex flex-col" style={{ marginTop: "auto", padding: "clamp(20px, 3vw, 36px)", color: "#FFFFFF" }}>
        <h2
          className="sx-on-photo"
          style={{
            margin: 0,
            fontFamily: "var(--sx-display)",
            fontWeight: 450,
            fontSize: "clamp(26px, 2.6vw, 38px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            fontVariationSettings: "\"SOFT\" 100",
            textWrap: "balance",
            textShadow: "0 2px 18px rgba(0, 30, 18, 0.35)",
          }}
        >
          {aside.heading}
        </h2>

        <ul className="hidden lg:flex flex-col" style={{ listStyle: "none", margin: "22px 0 0", padding: 0, gap: 10 }}>
          {aside.points.map((p) => (
            <li key={p} className="flex" style={{ gap: 12, fontSize: 14.5, lineHeight: 1.55, color: "rgba(255, 255, 255, 0.9)" }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="8" cy="8" r="7" fill="rgba(84, 231, 164, 0.28)" />
                <path d="M4.8 8.3l2.1 2.1 4.3-4.6" stroke="#B8F5D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Inline error banner used by the forms. */
export function AuthError({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="sx-alert sx-alert-danger" style={{ marginBottom: 20 }}>
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 4.8v3.8M8 10.6v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

/** Round status mark for the confirmation states. */
export function AuthSuccessMark() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center"
      style={{
        width: 52,
        height: 52,
        borderRadius: 18,
        background: "var(--sx-accent-grad)",
        boxShadow: "var(--sx-accent-glow)",
        color: "#FFFFFF",
        marginBottom: 22,
      }}
    >
      <svg width={22} height={22} viewBox="0 0 13 13" fill="none">
        <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
