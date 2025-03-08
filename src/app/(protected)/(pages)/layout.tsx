import { getRecentProjects } from "@/actions/project-action";
import { onAuthenticateUser } from "@/actions/user";
import { AppSidebar } from "@/components/global/app-sidebar";
import { UpperInfoBar } from "@/components/global/upper-info-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function PagesLayout({ children }: Props) {
  // Fetch recent projects and authenticate user
  const recentProjects = await getRecentProjects();
  const checkuser = await onAuthenticateUser();

  // Redirect if user is not authenticated
  if (!checkuser.user) {
    redirect("/sign-in");
  }

  // Render the layout
  return (
    <SidebarProvider>
      <AppSidebar
        user={checkuser.user}
        recentProjects={recentProjects.data || []}
      />
      <SidebarInset>
        <UpperInfoBar user={checkuser.user} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
