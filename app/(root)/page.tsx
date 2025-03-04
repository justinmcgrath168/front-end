import { Metadata } from "next";
import {
  Hero,
  Features,
  BusinessTypes,
  StatisticsBar,
  Testimonials,
  Pricing,
  FAQ,
  ClientLogos,
  Integrations,
  CallToAction,
  NewsletterSignup,
  Footer,
} from "@/types";
import { Navbar } from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "DentalSync | The Complete Dental Management Ecosystem",
  description:
    "Streamline your dental business with our all-in-one platform connecting clinics, labs, imaging centers, and suppliers in one integrated ecosystem.",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <ClientLogos />
        <StatisticsBar />
        <BusinessTypes />
        <Features />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CallToAction />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}
