import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Updates",
  description:
    "Thoughts and engineering insights from the Sense-XT team on biosensors, graphene, AI diagnostics, and the bleeding edge of deep-tech healthcare.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
