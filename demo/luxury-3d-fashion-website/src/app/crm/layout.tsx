import { crmGetSession } from "@/app/actions";
import { redirect } from "next/navigation";
import CrmShell from "./CrmShell";

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
  const session = await crmGetSession();
  if (!session) redirect("/crm/login");
  return <CrmShell session={session}>{children}</CrmShell>;
}
