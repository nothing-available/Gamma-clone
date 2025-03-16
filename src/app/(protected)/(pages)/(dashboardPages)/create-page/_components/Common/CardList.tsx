"use client";

import { OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onSelectCard: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  addMultipleOutlines,
  editText,
  editingCard,
  onCardDoubleClick,
  onEditChange,
  onSelectCard,
  outlines,
  selectedCard,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addOutline,
}: Props) => {

  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const dragOffSetY = useRef<number>(0);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDraggedOverIndex(index);
    } else {
      setDraggedOverIndex(index + 1);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || draggedOverIndex === null) return;

    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id
    );

    if (draggedIndex === -1 || draggedIndex === draggedOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
      draggedOverIndex > draggedIndex ? draggedOverIndex - 1 : draggedIndex,
      0,
      removedCard
    );

    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
    );

    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id: string) => () => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };

  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffSetY.current = e.clientY - rect.top;

    const draggedEl = e.currentTarget.cloneNode(true) as HTMLElement;

    draggedEl.style.position = "absolute";
    draggedEl.style.top = '-1000px';
    draggedEl.style.opacity = '0.8';
    draggedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffSetY.current);

    setTimeout(() => {
      setDraggedOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(draggedEl);
    }, 0);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const getDarggedOverStyle = (cardIdx: number) => {
    if (draggedOverIndex === null || draggedItem === null) return {};
    if (cardIdx === draggedOverIndex) {
      return {
        borderTop: '2px solid #000',
        marginTop: '0.5rem',
        transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      };
    } else if (cardIdx === draggedOverIndex - 1) {
      return {
        borderBottom: '2px solid #000',
        marginBottom: '0.5rem',
        transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      };
    }
    return {};
  };

  function OnAddCard(idx: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <motion.div
      className='space-y-2 -my-2'
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}

      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}>
      <AnimatePresence>
        {outlines.map((card, idx) => (
          <React.Fragment key={card.id}>
            <Card
              onDragOver={(e) => onDragOver(e, idx)}
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditkeydown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onSelectCard(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDelteClick={onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragStart(e, card),
                onDragEnd: () => onDragEnd(),
              }}
              dragOverStyle={getDarggedOverStyle(idx)} />

            <AddCardButton onAddCard={() => OnAddCard(idx)}/>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
