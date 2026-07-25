import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Sense-XT Innovations.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-p:font-light prose-p:leading-relaxed prose-headings:text-white">
          <p>Last updated: July 2026</p>

          <h2>1. Introduction</h2>
          <p>
            At Sense-XT Innovations Private Limited, we are committed to protecting and respecting your privacy. This policy explains when and why we collect personal information, how we use it, the conditions under which we may disclose it to others, and how we keep it secure.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and professional details when you contact us, subscribe to our newsletter, or use our services. We also automatically collect non-personal data such as your IP address and browsing behavior through cookies.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information to provide our services, improve our website, communicate with you regarding updates, offers, and events, and ensure the security of our platform. 
          </p>

          <h2>4. Data Sharing and Security</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential. We implement reasonable security measures to protect your data.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. If you have any concerns about your privacy, please contact us using the details provided on our website.
          </p>
        </div>
      </div>
    </main>
  );
}
