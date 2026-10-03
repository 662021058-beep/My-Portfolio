import type { Metadata } from "next";
import WorksGrid from "@/components/works/WorksGrid";

export const metadata: Metadata = { title: "Works" };

export default function WorksPage() {
  return (
    <main>
      <WorksGrid />
    </main>
  );
}
