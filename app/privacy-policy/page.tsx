import { LegalPage } from "@/components/shared/LegalPage";
import { getSiteContent } from "@/lib/site-content";
export async function generateMetadata() { return { title: (await getSiteContent()).legal["privacy-policy"].title }; }
export default function Page() { return <LegalPage name="privacy-policy" />; }
