import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
    outlines: OutlineCard[];
    resetOutline: () => void;
    addOutline: (outline: OutlineCard) => void;
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
};

const useScratchStore = create<OutlineStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                resetOutline: () => set({ outlines: [] }),
                addOutline: (outline: OutlineCard) => {
                    set((state) => ({
                        outlines: [...state.outlines, outline]
                    }));
                },
                addMultipleOutlines: (outlines: OutlineCard[]) => {
                    set(() => ({
                        outlines: [...outlines]
                    }));
                }
            }),
            { name: 'scratch-store' }
        )
    )
);

export default useScratchStore;