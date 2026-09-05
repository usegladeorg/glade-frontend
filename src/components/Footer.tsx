import Link from "next/link";
import { Brand } from "@/components/sx";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "App", href: "/app" },
      { label: "Create an account", href: "/signup" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Contracts on the explorer", href: "https://explorer.testnet.chain.robinhood.com/address/0x6bE6CD2eDc4E903fD5c869A3e8b766A58546D9f4", external: true },

    ],
  },
  {
    heading: "Capabilities",
    links: [
      { label: "Personal accounts", href: "/#accounts" },
      { label: "Accounts for agents", href: "/#accounts" },
      { label: "Encrypted transfers", href: "/#privacy" },
      { label: "Zero-knowledge proofs", href: "/#privacy" },
      { label: "Payments over x402", href: "/#agents" },
      { label: "Routing via MPP", href: "/#protocol" },
      { label: "Receipts on-chain", href: "/#transparency" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Docs home", href: "https://docs.useglade.org/", external: true },
      { label: "How a transfer works", href: "https://docs.useglade.org/start-here/life-of-a-payment", external: true },
      { label: "Picking the right account", href: "https://docs.useglade.org/start-here/account-kinds", external: true },
      { label: "Accounts for agents", href: "https://docs.useglade.org/agents/agent-accounts", external: true },
      { label: "API docs", href: "https://docs.useglade.org/api-reference/authentication", external: true },
      { label: "Architecture overview", href: "https://docs.useglade.org/architecture/how-it-fits-together", external: true },
      { label: "Join the beta", href: "/signup" },
      { label: "Common questions", href: "https://docs.useglade.org/help/common-questions", external: true },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Email the team", href: "mailto:contact@useglade.org" },
      { label: "X (Twitter)", href: "https://x.com/usegladeorg", external: true },
      { label: "GitHub", href: "https://github.com/usegladeorg", external: true },
    ],
  },
];

const linkClass = "hover:!text-[var(--sx-text)] transition-colors";

export function Footer() {
  return (
    <footer
      style={{
        background: "transparent",
        borderTop: "1px solid var(--sx-line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="sx-container" style={{ paddingTop: "clamp(64px, 8vw, 104px)" }}>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:[grid-template-columns:minmax(0,1.3fr)_repeat(4,minmax(0,1fr))]"
          style={{ columnGap: 32, rowGap: 48 }}
        >
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1" style={{ paddingRight: 24 }}>
            <Link href="/" aria-label="Go to the Glade homepage" style={{ textDecoration: "none", display: "inline-block" }}>
              <Brand size={30} />
            </Link>
            <p className="sx-small" style={{ marginTop: 22, maxWidth: 280 }}>
              Private banking for people and the AI agents working for them. Runs on Robinhood Chain with Ethereum security underneath.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="sx-overline" style={{ margin: 0, color: "var(--sx-text-4)" }}>
                {col.heading}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20, listStyle: "none", padding: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      style={{ fontSize: 14, lineHeight: 1.4, color: "var(--sx-text-2)", textDecoration: "none" }}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal row */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          style={{
            marginTop: "clamp(56px, 7vw, 88px)",
            padding: "22px 0 clamp(32px, 4vw, 48px)",
            borderTop: "1px solid var(--sx-line)",
            gap: 14,
          }}
        >
          <span className="sx-caption" style={{ color: "var(--sx-text-4)" }}>
            © {new Date().getFullYear()} Glade. Confidential from the start, provable at every step.
          </span>
          <div className="flex items-center" style={{ gap: 22 }}>
            <Link href="/roadmap" className={`sx-overline ${linkClass}`} style={{ textDecoration: "none" }}>
              What&apos;s next
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
