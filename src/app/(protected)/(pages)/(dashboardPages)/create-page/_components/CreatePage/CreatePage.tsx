// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   containerVariants,
//   CreatePageCard,
//   itemVariants,
// } from "@/lib/constants";
// import usePromptStore from "@/store/usePromptStore";
// import { motion } from "framer-motion";
// import RecentPrompt from "../Generate-AI/recentPrompt";

// type Props = {
//   onSelectOption: (option: string) => void;
// };

// export default function CreatePage({ onSelectOption }: Props) {
//   const { prompts, setpage } = usePromptStore();
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial='hidden'
//       animate='visible'
//       className='space-y-8'>
//       <motion.div
//         variants={itemVariants}
//         className='text-center space-y-2'>
//         <h1 className='text-4xl font-bold text-primary'>
//           How would you like to get started?
//         </h1>

//         <p className='text-secondary'>Choose your preferred method to begin</p>

//         <motion.div
//           variants={containerVariants}
//           className='grid gap-6 md:grid-cols-3'>
//           {CreatePageCard.map(option => (
//             <motion.div
//               key={option.type}
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.05,
//                 rotate: 1,
//                 transition: { duration: 0.1 },
//               }}
//               className={`${
//                 option.highlight
//                   ? "bg-vivid-gradient"
//                   : "hover:bg-vivid-gradient border"
//               }rounded-xl p-[1px] transition-all duration-300 ease-in-out`}>
//               <motion.div
//                 className='w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl'
//                 whileHover={{ transition: { duration: 0.1 } }}>
//                 <div className='flex flex-col items-start w-full gap-y-3'>
//                   <div>
//                     <p className='text-primary text-lg font-semibold'>
//                       {option.title}
//                     </p>

//                     <p
//                       className={`${
//                         option.highlight ? "text-vivid" : "text-primary"
//                       }text-4xl font-bold`}>
//                       {option.highlightedText}
//                     </p>
//                   </div>

//                   <p className='text-secondary text-sm font-normal'>
//                     {option.description}
//                   </p>
//                 </div>

//                 <motion.div
//                   className='self-end'
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}>
//                   <Button
//                     variant={option.highlight ? "default" : "outline"}
//                     className='w-fit rounded-xl font-bold'
//                     size={"sm"}
//                     onClick={() => onSelectOption(option.type)}>
//                     {option.highlight ? "Generate" : "Continue"}
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {prompts.length > 0 && <RecentPrompt />}
//     </motion.div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import RecentPrompt from "../Generate-AI/RecentPrompt";
import { useEffect } from "react";

type Props = {
  onSelectOption: (option: string) => void;
};

// Card Component for Reusability
const OptionCard = ({
  option,
  onSelectOption,
}: {
  option: (typeof CreatePageCard)[number];
  onSelectOption: (option: string) => void;
}) => {
  return (
    <motion.div
      key={option.type}
      variants={itemVariants}
      whileHover={{
        scale: 1.05,
        rotate: 1,
        transition: { duration: 0.1 },
      }}
      className={`${
        option.highlight
          ? "bg-vivid-gradient"
          : "hover:bg-vivid-gradient border"
      } rounded-xl p-[1px] transition-all duration-300 ease-in-out`}>
      <motion.div
        className='w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl'
        whileHover={{ transition: { duration: 0.1 } }}>
        <div className='flex flex-col items-start w-full gap-y-3'>
          <div>
            <p className='text-primary text-lg font-semibold'>{option.title}</p>
            <p
              className={`${
                option.highlight ? "text-vivid" : "text-primary"
              } text-4xl font-bold`}>
              {option.highlightedText}
            </p>
          </div>
          <p className='text-secondary text-sm font-normal'>
            {option.description}
          </p>
        </div>

        <motion.div
          className='self-end'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Button
            variant={option.highlight ? "default" : "outline"}
            className='w-fit rounded-xl font-bold'
            size={"sm"}
            onClick={() => onSelectOption(option.type)}
            aria-label={`Select ${option.title}`}>
            {option.highlight ? "Generate" : "Continue"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function CreatePage({ onSelectOption }: Props) {
  const { prompts, setpage } = usePromptStore();

  // useEffect(() => {
  //   setpage("create");
  // }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='space-y-8'>
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className='text-center space-y-2'>
        <h1 className='text-4xl font-bold text-primary'>
          How would you like to get started?
        </h1>
        <p className='text-secondary'>Choose your preferred method to begin</p>
      </motion.div>

      {/* Option Cards Grid */}
      <motion.div
        variants={containerVariants}
        className='grid gap-6 md:grid-cols-3'>
        {CreatePageCard.map(option => (
          <OptionCard
            key={option.type}
            option={option}
            onSelectOption={onSelectOption}
          />
        ))}
      </motion.div>

      {/* Recent Prompts Section */}
      {prompts.length > 0 && <RecentPrompt />}
    </motion.div>
  );
}
