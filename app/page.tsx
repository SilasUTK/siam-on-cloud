import {
  AboutCompanySection,
  AISolutionsSection,
  CTASection,
  FeaturesSection,
  Footer,
  HeroSection,
  Navbar,
  ServicesSection,
  TravelSolutionsSection,
} from "@/components";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <AboutCompanySection />
        <AISolutionsSection />
        <TravelSolutionsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
