'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/constants";
import useScratchStore from "@/store/useScratchStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CardList from "../Common/CardList";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { toast } from "sonner";
import { createProject } from "@/actions/project-action";
import { useSlideStore } from "@/store/useSlideStore";


type Props = {
    onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {

    const router = useRouter();
    const { setProject } = useSlideStore();

    const { addMultipleOutlines, addOutline, outlines, resetOutline } = useScratchStore();

    const [editText, setEditText] = useState("");
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const handleBack = () => {
        resetOutline();
        onBack();
    };

    const resetCards = () => {
        setEditText("");
        resetOutline();
    };

    const handleAddCard = () => {
        const newCard: OutlineCard = {
            id: v4(),
            title: editText || 'New Section',
            order: outlines.length + 1,
        };
        setEditText("");
        addOutline(newCard);
    };

    const handleGenerate = async () => {
        if (outlines.length === 0) {
            toast.error('Error', {
                description: 'Please add at least one card to generate PPT'
            });
            return;
        }
        const res = await createProject(outlines?.[0]?.title, outlines);

        if (res.status !== 200) {
            toast.error('Error', {
                description: res.error || 'Failed to generate PPT'
            });
            return;
        }
        if (res.data) {
            setProject(res.data);
            resetOutline();
            toast.success('Success', {
                description: 'Project generated successfully'
            });
            router.push(`/presentation/${res.data.id}/select-theme`);
        } else {
            toast.error('Error', {
                description: 'Failed to generate Project'
            });
        }
    };

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible">

            <Button
                variant={"outline"}
                className="mb-4"
                onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
                Prompt
            </h1>

            <motion.div
                className="bg-primary/10 p-4 rounded-xl"
                variants={itemVariants}>

                <div className="flex flex-col sm:flex-row justify-between gap-2 items-center rounded-xl">

                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
                        placeholder="Enter Prompts and add to the card..." />

                    <div className="flex items-center gap-3">
                        <Select value={outlines.length > 0 ? outlines.length.toString() : "0"}>

                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select numbers of card" />
                            </SelectTrigger>

                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem
                                        value="0"
                                        className="font-semibold">
                                        NO card
                                    </SelectItem>
                                ) : (
                                    Array.from({
                                        length: outlines.length
                                    },
                                        (_, idx) => idx + 1)
                                ).map((num) => (
                                    <SelectItem
                                        key={num}
                                        value={num.toString()}
                                        className="font-semibold">
                                        {num}{num > 1 ? "Card" : "Cards"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant={"destructive"}
                            size={"icon"}
                            aria-label="Reset Card"
                            onClick={resetCards}>

                        </Button>
                    </div>

                </div>
            </motion.div>

            <CardList
                outlines={outlines}
                setEditingCard={setEditingCard}
                setEditText={setEditText}
                addOutline={addOutline}
                addMultipleOutlines={addMultipleOutlines}
                editingCard={editingCard}
                selectedCard={selectedCard}
                editText={editText}
                onEditChange={setEditText}
                onSelectCard={setSelectedCard}
                onCardDoubleClick={(id, title) => {
                    setEditingCard(id);
                    setEditText(title);
                }}
                setSelectedCard={setSelectedCard}
            />

            <Button
                onClick={handleAddCard}
                variant={"secondary"}
                className="w-full bg-primary-10"
            >
                Add Card
            </Button>

            {outlines.length > 0 && (
                <Button
                    onClick={handleGenerate}
                    className="w-full">
                    Generate PPT
                </Button>
            )}

        </motion.div>
    );
};
export default ScratchPage;