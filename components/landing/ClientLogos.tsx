// src/components/landing/ClientLogos.tsx
import Image from "next/image";
import { SectionProps, ClientLogoProps } from "@/types";

const logos: ClientLogoProps[] = [
  {
    name: "Dental Excellence",
    logoUrl: "/images/logos/dental-excellence.svg",
    altText: "Dental Excellence logo",
  },
  {
    name: "SmilePerfect Clinics",
    logoUrl: "/images/logos/smile-perfect.svg",
    altText: "SmilePerfect Clinics logo",
  },
  {
    name: "OrthoLabs Inc",
    logoUrl: "/images/logos/ortho-labs.svg",
    altText: "OrthoLabs Inc logo",
  },
  {
    name: "PrecisionDent",
    logoUrl: "/images/logos/precision-dent.svg",
    altText: "PrecisionDent logo",
  },
  {
    name: "ClearView Imaging",
    logoUrl: "/images/logos/clear-view.svg",
    altText: "ClearView Imaging logo",
  },
  {
    name: "DentSupply",
    logoUrl: "/images/logos/dent-supply.svg",
    altText: "DentSupply logo",
  },
];

export function ClientLogos({ id, className }: SectionProps) {
  return (
    <section id={id || "clients"} className={`py-12 ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 font-medium mb-8">
          Trusted by leading dental businesses
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.logoUrl}
                alt={logo.altText}
                width={120}
                height={48}
                className="object-contain h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
