import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for Sense-XT Innovations.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
          Terms & Conditions
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-p:font-light prose-p:leading-relaxed prose-headings:text-white">
          <p>Last updated: July 2026</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Sense-XT Innovations Private Limited. By accessing our website, you agree to these Terms and Conditions. Please read them carefully.
          </p>

          <h2>2. Use of Our Services</h2>
          <p>
            You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our website.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws and are owned by Sense-XT Innovations Private Limited, unless otherwise stated.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            Sense-XT Innovations Private Limited will not be liable for any damages arising in contract, tort or otherwise from the use of or inability to use this site, or any material contained in it, or from any action or decision taken as a result of using this site or any such material.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </div>
      </div>
    </main>
  );
}
