import { OutlineCard } from "@/lib/types";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card as UICard } from "@/components/ui/card";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditkeydown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDelteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyle: React.CSSProperties;
};

const Card = ({
  card,
  dragHandlers,
  dragOverStyle,
  editText,
  isEditing,
  isSelected,
  onCardClick,
  onCardDoubleClick,
  onDelteClick,
  onDragOver,
  onEditBlur,
  onEditChange,
  onEditkeydown,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className='relative'>
      <div
        draggable
        onDragOver={onDragOver}
        style={dragOverStyle}
        {...dragHandlers}>
        <UICard></UICard>
      </div>
    </motion.div>
  );
};

export default Card;
