import { LegalPage } from "@/components/shared/LegalPage";
import { getSiteContent } from "@/lib/site-content";
export async function generateMetadata() { return { title: (await getSiteContent()).legal["refund-and-cancellation"].title }; }
export default function Page() { return <LegalPage name="refund-and-cancellation" />; }
