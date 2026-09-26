import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductPreview } from "@/components/ProductPreview";
import { LogosBar } from "@/components/LogosBar";
import { NewSpeciesSection } from "@/components/NewSpeciesSection";
import { BentoSection } from "@/components/BentoSection";
import {
  INTAKE_SECTION,
  PLAN_SECTION,
  BUILD_SECTION,
  DIFFS_SECTION,
  MONITOR_SECTION,
  type FeatureSectionProps,
} from "@/components/FeatureSection";
import { FeatureTabs, type FeatureTab } from "@/components/FeatureTabs";
import { IntakeMockup } from "@/components/mockups/IntakeMockup";
import { PlanMockup } from "@/components/mockups/PlanMockup";
import { BuildMockup } from "@/components/mockups/BuildMockup";
import { DiffsMockup } from "@/components/mockups/DiffsMockup";
import { MonitorMockup } from "@/components/mockups/MonitorMockup";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DeveloperSection } from "@/components/DeveloperSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

function tab(section: Omit<FeatureSectionProps, "mockup">, mockup: ReactNode): FeatureTab {
  return {
    id: section.sectionLabel.toLowerCase(),
    label: section.sectionLabel,
    heading: section.heading.replace(/\n/g, " "),
    description: section.description,
    points: section.subItems.map((s) => s.label),
    href: section.sectionHref,
    mockup,
  };
}

const TABS: FeatureTab[] = [
  tab(INTAKE_SECTION, <IntakeMockup />),
  tab(PLAN_SECTION, <PlanMockup />),
  tab(BUILD_SECTION, <BuildMockup />),
  tab(DIFFS_SECTION, <DiffsMockup />),
  tab(MONITOR_SECTION, <MonitorMockup />),
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />

      <HeroSection />

      <LogosBar />

      <NewSpeciesSection />

      <ProductPreview />

      <BentoSection />

      <FeatureTabs tabs={TABS} />

      <HowItWorksSection />

      <DeveloperSection />

      <FAQSection />

      <CTASection />

      <Footer />
    </main>
  );
}
