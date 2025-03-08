"use client";

import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ThumbnailPreview } from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import { useState } from "react";
import { AlertDailogBox } from "../alert-dailog-box";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project-action";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

export function ProjectCard({
  createdAt,
  projectId,
  slideData,
  title,
  isDeleted,
  themeName,
}: Props) {
  const router = useRouter();

  const [loadng, setloading] = useState(false);
  const [open, setopen] = useState(false);

  const { setSlides } = useSlideStore();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find(theme => theme.name === themeName) || themes[0];

  const handleRecover = async () => {
    setloading(true);
    if (!projectId) {
      setloading(false);
      toast("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Something went wrong",
        });
        return;
      }
      setopen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (err) {
      console.log(err);
      toast.error("Oops!", {
        description: "Something went wrong. Please contact support",
      });
    }
  };

  const handleDelete = async () => {
    setloading(true);
    if (!projectId) {
      setloading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Failed to delete",
        });
        return;
      }
      setopen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project delete sucessfull",
      });
    } catch (err) {
      console.log(err);
      toast.error("Oops!", {
        description: "Something went wrong. Please contact support",
      });
    }
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariants}>
      <div
        className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer'
        onClick={handleNavigation}>
        <ThumbnailPreview
          theme={theme}
          // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />

        <div className='w-full'>
          <div className='space-y-1'>
            <h3 className='font-semibold text-base text-primary line-clamp-1'>
              {" "}
              {title}
            </h3>
            <div className='flex w-full justify-between items-center gap-2'>
              <p
                className='text-sm text-muted-foreground'
                suppressHydrationWarning>
                {timeAgo(createdAt)}
              </p>

              {isDeleted ? (
                <AlertDailogBox
                  description='This will recover your project and restore your data.'
                  clasName='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
                  loading={loadng}
                  onClick={handleRecover}
                  open={open}
                  handleOpen={() => setopen(!open)}>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    disabled={loadng}
                    className='bg-background-80 dark:hover:bg-background-90'>
                    Recover
                  </Button>
                </AlertDailogBox>
              ) : (
                <AlertDailogBox
                  description='This will delete your project and send it to trash'
                  clasName='bg-red-500 text-white dark:bg-red-600 hover:bg:red-600 dark:hover:bg-red-700'
                  loading={loadng}
                  open={open}
                  onClick={handleDelete}
                  handleOpen={() => setopen(!open)}>
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    disabled={loadng}
                    className='bg-background-80 dark:hover:bg-background-90'>
                    Delete
                  </Button>
                </AlertDailogBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
