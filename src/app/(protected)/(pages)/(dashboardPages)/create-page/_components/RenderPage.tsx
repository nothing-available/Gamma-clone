"use client";
import usePromptStore from "@/store/usePromptStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./CreatePage/CreatePage";

export default function RenderPage() {
  const router = useRouter();

  const { page, setpage } = usePromptStore();

  const renderSteps = () => {
    switch (page) {
      case "create":
        return <CreatePage />;
      case "create-scratch":
        return <></>;
      case "creative-ai":
        return <></>;
      default:
        return null;
    }
  };
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}>
        {renderSteps()}
      </motion.div>
    </AnimatePresence>
  );
}
