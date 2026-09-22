import { LegalPage } from "@/components/shared/LegalPage";
import { getSiteContent } from "@/lib/site-content";
export async function generateMetadata() { return { title: (await getSiteContent()).legal["terms-and-conditions"].title }; }
export default function Page() { return <LegalPage name="terms-and-conditions" />; }
