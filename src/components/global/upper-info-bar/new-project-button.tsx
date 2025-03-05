"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";

export function NewProjectButton({ user }: { user: User }) {
  return (
    <Button
      size={"lg"}
      disabled={!user.subscription}
      //   onClick={}
      className='rounded-lg font-semibold'>
      <Plus />
      New Project
    </Button>
  );
}
