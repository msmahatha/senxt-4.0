import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund and Cancellation",
  description: "Refund and cancellation policy for Sense-XT Innovations.",
};

export default function RefundAndCancellationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
          Refund & Cancellation
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-p:font-light prose-p:leading-relaxed prose-headings:text-white">
          <p>Last updated: July 2026</p>

          <h2>1. Cancellation Policy</h2>
          <p>
            At Sense-XT Innovations Private Limited, we strive to ensure our clients and partners are satisfied with our products and services. Cancellations for hardware or biosensing product orders must be made within 48 hours of placing the order. After this period, production and dispatch processes may have already commenced, and cancellation requests will be evaluated on a case-by-case basis.
          </p>

          <h2>2. Refund Policy</h2>
          <p>
            Refunds are generally only processed under the following circumstances:
          </p>
          <ul>
            <li>If a hardware product arrives damaged or defective.</li>
            <li>If the wrong product was delivered.</li>
            <li>If the service or product cannot be fulfilled due to stock or operational issues on our end.</li>
          </ul>
          <p>
            To initiate a refund, please contact our support team with your order details and evidence of the issue (e.g., photos of the damaged product).
          </p>

          <h2>3. Processing Time</h2>
          <p>
            Once your return or cancellation is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
          </p>

          <h2>4. Exceptions</h2>
          <p>
            Custom-developed biosensors, specialized nanotechnology materials, and software licensing fees are generally non-refundable once delivered, unless they materially fail to meet the agreed-upon technical specifications.
          </p>
        </div>
      </div>
    </main>
  );
}
