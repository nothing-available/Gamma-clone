"use client";
import usePromptStore from "@/store/usePromptStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./CreatePage/CreatePage";
import CreateAI from "./Generate-AI/CreateAI";

export default function RenderPage() {
  const router = useRouter();

  const { page, setpage } = usePromptStore();

  const handleBack = () => {
    setpage("create");
  }

  const handleSelectOption = (option: string) => {
    if (option === "template") {
      router.push("/templates");
    } else if (option === "create-scratch") {
      setpage("create-scratch");
    } else if (option === "creative-ai") {
      setpage("creative-ai");
    }
  };

  const renderSteps = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={handleSelectOption} />;
      case "creative-ai":
        return <CreateAI onBack={handleBack}/>;
      case "create-scratch":
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
