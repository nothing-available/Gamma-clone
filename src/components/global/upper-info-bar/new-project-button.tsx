"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewProjectButton({ user }: { user: User }) {
  const router = useRouter()
  return (
    <Button
      size={"lg"}
      disabled={!user.subscription}
        onClick={()=>router.push('/create-page')}
      className='rounded-lg font-semibold'>
      <Plus />
      New Project
    </Button>
  );
}
