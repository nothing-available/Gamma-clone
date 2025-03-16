"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAiStore from "@/store/useCreativeAIStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import CardList from "../Common/CardList";
import usePromptStore from "@/store/usePromptStore";
import RecentPrompt from "./RecentPrompt";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/openAi";

type Props = {
  onBack: () => void;
};

const CreateAI = ({ onBack }: Props) => {
  const router = useRouter();

  const [editingCard, seteditingCard] = useState<string | null>(null);
  const [isGenerating, setisGenerating] = useState(false);
  const [selectedCard, setselectedCard] = useState<string | null>(null);
  const [editText, seteditText] = useState("");
  const [noOfCards, setnoOfCards] = useState(0);
  const { addPrompt, prompts } = usePromptStore();

  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAiStore();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    seteditingCard(null);
    setselectedCard(null);
    seteditText("");

    setCurrentAiPrompt("");
    resetOutlines();
  };

  const generateOutline = async () => {
    if (currentAiPrompt === '') {
      toast.error('Error', {
        description: 'Please enter a prompt to generate outline',
      });
      return;
    }
    setisGenerating(true);

    const res = await generateCreativePrompt(currentAiPrompt);
  };

  const handleGenerate = () => { };

  return (
    <motion.div
      className='space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
      variants={containerVariants}
      initial='hidden'
      animate='visible'>
      <Button
        onClick={handleBack}
        variant={"outline"}
        className='mb-4'>
        <ChevronLeft className='mr-2 h-4 w-4' />
        Back
      </Button>

      <motion.div
        variants={itemVariants}
        className='text-center space-y-2'>
        <h1 className='text-4xl font-bold text-primary'>
          Generate with <span className='text-vivid'>Creative AI</span>
        </h1>
        <p className='text-secondary'>What would like to create today</p>
      </motion.div>

      <motion.div
        className='bg-primary/10 p-4 rounded-xl'
        variants={itemVariants}>
        <div className='felx flex-col sm:flex-row justify-between gap-3 items-center rounded-xl'>
          <Input
            value={currentAiPrompt || ""}
            onChange={e => setCurrentAiPrompt(e.target.value)}
            placeholder='Enter prompt and add to the cards...'
            className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow'
            required
          />

          <div className='flex items-center gap-3'>
            <Select
              value={noOfCards.toString()}
              onValueChange={value => setnoOfCards(parseInt(value))}>
              <SelectTrigger className='w-fit gap-2 font-semibold shadow-xl'>
                <SelectValue placeholder='Select number of Cards' />
              </SelectTrigger>

              <SelectContent className='w-fit'>
                {outlines.length === 0 ? (
                  <SelectItem
                    value='0'
                    className='font-semibold'>
                    No Cards
                  </SelectItem>
                ) : (
                  Array.from({ length: outlines.length }, (_, i) => i + 1).map(
                    num => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className='font-semibold'>
                        {num}
                        {num === 1 ? "Card" : "Cards"}
                      </SelectItem>
                    )
                  )
                )}
              </SelectContent>
            </Select>

            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={resetCards}
              aria-label='Reset cards'>
              <RotateCcw className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className='w-full flex justify-center items-center'>
        <Button
          className='font-medium text-lg flex gap-2 items-center'
          onClick={generateOutline}
          disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className=' animate-spin mr-2' />
              Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>

      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={seteditText}
        onSelectCard={setselectedCard}
        setEditText={seteditText}
        setEditingCard={seteditingCard}
        setSelectedCard={setselectedCard}
        onCardDoubleClick={(id, title) => {
          seteditingCard(id);
          seteditText(title);
        }}
      />

      {outlines.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : 'Generate'}
        </Button>
      )}

      {prompts.length > 0 && <RecentPrompt />}

    </motion.div>
  );
};

export default CreateAI;
