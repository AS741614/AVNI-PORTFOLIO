import { getIntegrationStatus } from "@/lib/integrationStatus";
import { getSiteStats } from "@/lib/siteStats";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <DashboardClient integrations={getIntegrationStatus()} initialStats={getSiteStats()} />;
}
