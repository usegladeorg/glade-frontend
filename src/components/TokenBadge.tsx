"use client";

import { useState } from "react";

export const GLADE_TOKEN_ADDRESS = "";


/** Token badge for the hero: the ticker and the full contract address, copied with one click. */
export function TokenBadge() {
  const [copied, setCopied] = useState(false);
  const address = GLADE_TOKEN_ADDRESS.trim();

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard can be blocked; the full address is still selectable. */
    }
  }

  return (
    <div
      className="sx-glass inline-flex items-center"
      style={{ maxWidth: "100%", gap: 4, padding: 5, borderRadius: 22, boxShadow: "var(--sx-shadow-sm)" }}
    >
      <span
        className="sx-num"
        style={{
          padding: "6px 12px",
          borderRadius: 999,
          background: "var(--sx-accent-grad)",
          color: "var(--sx-on-accent)",
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        $GLADE
      </span>

      {address ? (
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Address copied" : `Copy token address ${address}`}
          title={copied ? "Copied" : "Copy address"}
          className="group inline-flex items-center text-left"
          style={{ gap: 8, minWidth: 0, padding: "4px 6px 4px 10px", border: 0, borderRadius: 999, background: "transparent", cursor: "pointer" }}
        >
          <span
            className="sx-mono"
            style={{ fontSize: "clamp(11.5px, 3vw, 13px)", color: "var(--sx-text-2)", overflowWrap: "anywhere", lineHeight: 1.35 }}
          >
            {address}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center transition-colors group-hover:bg-[var(--sx-surface-hover)]"
            style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, color: copied ? "var(--sx-ok)" : "var(--sx-text-3)" }}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 3.5V3a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </span>
        </button>
      ) : (
        <span style={{ padding: "0 14px 0 10px", fontSize: 13.5, fontWeight: 550, color: "var(--sx-text-3)", whiteSpace: "nowrap" }}>
          Address coming soon
        </span>
      )}
    </div>
  );
}
