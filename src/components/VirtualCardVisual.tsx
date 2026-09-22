import Image from "next/image";
import { useId } from "react";
import type { VirtualCard } from "@/lib/supabase/database.types";

export function formatExpiry(month: number, year: number): string {
  return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
}

/* ── Virtual card visual ──────────────────────────────────────────────────────
   A pure HTML/CSS brand card: emerald glass lit by mint from the top right,
   a fine leaf-vein texture, a specular sheen, the mark top right and a
   champagne chip on the left.
   The card is an inline-size container, so every measurement is in cqw and
   the layout holds its proportions at any width. */

function BrushedChip() {
  const gradId = useId();
  return (
    <svg viewBox="0 0 34 26" aria-hidden="true" style={{ width: "11.5cqw", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EDE8DA" />
          <stop offset="0.35" stopColor="#C7BFAA" />
          <stop offset="0.6" stopColor="#A39A84" />
          <stop offset="1" stopColor="#E1DAC7" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="33" height="25" rx="4.5" fill={`url(#${gradId})`} stroke="rgba(40,48,30,0.35)" />
      <path
        d="M12 0.5v7a3.5 3.5 0 0 1-3.5 3.5H0.5M22 0.5v7a3.5 3.5 0 0 0 3.5 3.5h7.5M12 25.5v-6a3.5 3.5 0 0 0-3.5-3.5H0.5M22 25.5v-6a3.5 3.5 0 0 1 3.5-3.5h7.5M12 11.5h10M12 15.5h10"
        stroke="rgba(60,52,38,0.55)"
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  );
}

/* Small printed label over a value */
const engraved: React.CSSProperties = {
  fontFamily: "var(--sx-label)",
  fontWeight: 650,
  fontSize: "max(7.5px, 1.95cqw)",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(230, 255, 242, 0.62)",
  lineHeight: 1,
};

const embossed: React.CSSProperties = {
  fontFamily: "var(--sx-display)",
  fontVariantNumeric: "tabular-nums",
  fontWeight: 500,
  fontSize: "max(11px, 3.3cqw)",
  letterSpacing: "0.04em",
  color: "#FFFFFF",
  textShadow: "0 1px 2px rgba(0, 50, 30, 0.35)",
  lineHeight: 1,
  marginTop: "1.8cqw",
};

export function VirtualCardVisual({
  card,
  revealed,
}: {
  card: VirtualCard;
  revealed: boolean;
}) {
  const frozen = card.status === "frozen";

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1.586",
        width: "100%",
        maxWidth: "460px",
        containerType: "inline-size",
        // Card print is always left-aligned, whatever the surrounding section does
        textAlign: "left",
        borderRadius: "var(--sx-r-xl)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        overflow: "hidden",
        isolation: "isolate",
        // Emerald glass: specular sheen, fine diagonal veins, mint light
        // behind the mark and a slate-blue pool low left, over emerald.
        background: [
          "linear-gradient(112deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 26%, rgba(255,255,255,0) 44%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0) 88%)",
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 7px)",
          "radial-gradient(circle at 86% 12%, rgba(122, 237, 181, 0.75), rgba(84, 231, 164, 0) 46%)",
          "radial-gradient(circle at 6% 104%, rgba(136, 170, 186, 0.55), rgba(136, 170, 186, 0) 48%)",
          "linear-gradient(150deg, #18B377 0%, #0B8A5B 40%, #076A4A 72%, #0A5C58 100%)",
        ].join(", "),
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.45)",
          "inset 0 -1px 0 rgba(0,60,36,0.35)",
          "0 30px 60px -20px rgba(6, 90, 58, 0.55)",
          "0 12px 24px -12px rgba(14, 64, 44, 0.35)",
        ].join(", "),
        filter: frozen ? "grayscale(0.9) brightness(0.85)" : "none",
        transition: "filter 0.3s var(--sx-ease), transform 0.4s var(--sx-ease)",
      }}
    >
      {/* Grain, so the glass reads as a physical surface */}
      <div aria-hidden="true" className="sx-noise" style={{ position: "absolute", inset: 0, opacity: 0.08, zIndex: -1 }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "5.8cqw 6.2cqw 5.6cqw",
        }}
      >
        {/* Top row: Virtual · Debit left, mark right (mirrors the brand card) */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw", height: "4.4cqw", marginTop: "0.4cqw" }}>
            <span style={{ ...engraved, fontSize: "max(8px, 2.3cqw)", color: "rgba(230, 255, 242, 0.8)" }}>Virtual · Debit</span>
            {frozen && (
              <span className="sx-tag sx-tag-accent" style={{ height: "4.4cqw", minHeight: 16, padding: "0 1.6cqw", fontSize: "max(8px, 1.9cqw)" }}>
                Frozen
              </span>
            )}
          </div>
          <div style={{ position: "relative", width: "11cqw", aspectRatio: "1", borderRadius: "3.2cqw", overflow: "hidden", boxShadow: "0 4px 14px -4px rgba(0, 50, 30, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.6)" }}>
            <Image src="/images/logo.png" alt="Glade" fill sizes="80px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Chip + contactless, centered in the free space between the header
            and the number so it can never collide with either */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "3cqw" }}>
          <BrushedChip />
          <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ width: "4cqw", height: "auto" }}>
            <path d="M5 3.5C7.5 6.5 7.5 11.5 5 14.5M8.5 2C11.8 6 11.8 12 8.5 16M12 0.5c4 5 4 12 0 17" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Number: always masked to the last four digits, groups justified
            across the full card width */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--sx-display)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 400,
            fontSize: "max(15px, 5.6cqw)",
            letterSpacing: "0.1em",
            color: "#FFFFFF",
            textShadow: "0 1px 2px rgba(0, 50, 30, 0.35)",
            lineHeight: 1,
          }}
        >
          {["••••", "••••", "••••", card.card_number.slice(-4)].map((group, i) => (
            <span key={i} style={i < 3 ? { color: "rgba(255, 255, 255, 0.82)", letterSpacing: "0.2em" } : undefined}>
              {group}
            </span>
          ))}
        </div>

        {/* Bottom row: cardholder, expiry, cvv, network mark */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.5fr) auto auto auto",
            alignItems: "end",
            columnGap: "6cqw",
            marginTop: "6cqw",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={engraved}>Holder</div>
            <div style={{ ...embossed, letterSpacing: "0.1em", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {card.cardholder_name}
            </div>
          </div>
          <div>
            <div style={engraved}>Valid thru</div>
            <div style={embossed}>{formatExpiry(card.expiry_month, card.expiry_year)}</div>
          </div>
          <div>
            <div style={engraved}>CVV</div>
            <div style={{ ...embossed, color: revealed ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)" }}>{revealed ? card.cvv : "•••"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
            {card.network === "mastercard" ? (
              <svg viewBox="0 0 38 24" role="img" aria-label="Mastercard" style={{ width: "9.5cqw", height: "auto", display: "block" }}>
                <circle cx="14" cy="12" r="9" fill="#EB001B" />
                <circle cx="24" cy="12" r="9" fill="#F79E1B" fillOpacity="0.9" />
                <path d="M19 4.6a9 9 0 0 1 0 14.8 9 9 0 0 1 0-14.8Z" fill="#F16522" />
              </svg>
            ) : (
              <span
                role="img"
                aria-label="Visa"
                style={{
                  fontFamily: "var(--sx-sans)",
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: "max(13px, 4.6cqw)",
                  letterSpacing: "0.02em",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                VISA
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The card with sample details, for marketing pages. */
export function SampleCardVisual() {
  return (
    <VirtualCardVisual
      revealed={false}
      card={{ card_number: "4000123412347346", status: "active", cardholder_name: "Vlad Tenev", expiry_month: 7, expiry_year: 2030, cvv: "000", network: "visa" } as VirtualCard}
    />
  );
}
