"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSlideStore } from "@/store/useSlideStore";
import { Project } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  recentProjects: Project[];
};

export function RecentOpen({ recentProjects }: Props) {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("Project not found", {
        description: "Please try again",
      });
      return;
    }

    try {
      // Parse slides and update the store
      const parsedSlides = JSON.parse(JSON.stringify(slides));
      setSlides(parsedSlides);

      // Navigate to the presentation page
      router.push(`/presentation/${projectId}`);
    } catch (err) {
      console.log(err);
      toast.error("Invalid slides data", {
        description: "Please check the project and try again",
      });
    }
  };

  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel> Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map(item => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`hover:bg-primary-80`}>
                  <Button
                    variant={"link"}
                    className={`text-xs items-center justify-start`}
                    onClick={() => handleClick(item.id, item.slides)}>
                    <span>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : ""}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    <div className='p-4 text-sm text-muted-foreground'>
      No recent projects. Create a new one!
    </div>
  );
}

//  <div className='p-4 text-sm text-muted-foreground'>
//           No recent projects. Create a new one!
//         </div>
