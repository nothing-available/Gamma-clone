"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import React from "react";
import { NavBarMain } from "./nav-main";
import { data } from "@/lib/constants";
import { RecentOpen } from "./recent-open";
import { NavFooter } from "./nav-footer";

export function AppSidebar({
  recentProjects,
  user,
  ...props
}: { recentProjects?: Project[] } & { user?: User } & React.ComponentProps<
    typeof Sidebar
  >) {
  // console.log("User data:", user);
  return (
    <Sidebar
      collapsible='icon'
      className='max-w-[212px] bg-background-90'
      {...props}>
      {/* Sidebar Header */}
      <SidebarHeader className='pt-6 px-3 pb-0'>
        <SidebarMenuButton
          size={"lg"}
          className='data-[state=open]:text-sidebar-accent-foreground'>
          {/* Avatar */}
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Avatar className='h-10 w-10 rounded-full'>
              <AvatarImage
                src='/prism.jpg'
                alt='prism-logo'
              />
              <AvatarFallback className='rounded-lg'>VI</AvatarFallback>
            </Avatar>
          </div>

          {/* App Name */}
          <span className='truncate text-primary text-3xl font-semibold'>
            Prism
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className='px-3 mt-10 gap-y-6'>
        <NavBarMain items={data.navMain} />

        <RecentOpen recentProjects={recentProjects ?? []} />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        {/* {console.log(user)} */}
        <NavFooter prismaUser={user}/>
      </SidebarFooter>
    </Sidebar>
  );
}
