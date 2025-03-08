import { containerVariants, itemVariants } from "@/lib/constants";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";

export default function RecentPrompt() {
  const { prompts, setpage } = usePromptStore();
  return (
    <motion.div
      variants={containerVariants}
      className='space-y-4 !mt-20'>
      <motion.h2
        variants={itemVariants}
        className='text-2xl font-semibold text-center'>
        Your Recent Prompts
      </motion.h2>

      <motion.div
        variants={containerVariants}
        className='space-y-2 w-full lg:max-w-[80%] mx-auto'>
            
        </motion.div>
    </motion.div>
  );
}
