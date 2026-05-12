import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LineupStats from "@/components/LineupStats";
import ModelCards from "@/components/ModelCards";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import CompareTable from "@/components/CompareTable";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LineupStats />
        <ModelCards />
        <Features />
        <UseCases />
        <CompareTable />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
