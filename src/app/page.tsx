import { DashboardLayout } from "@/features/dashboard/dashboard-layout";

export async function generateMetadata() {
  return {
    title: "Arctern Express",
  };
}

export default function Home() {
  return (
    <DashboardLayout>
      <></>
    </DashboardLayout>
  );
}
