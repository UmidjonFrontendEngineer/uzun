import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface saralanganState {
    saralanganIds: number[];
    toggleSaralangan: (id: number) => void;
}

export const useSaralanganStore = create<saralanganState>()(
    persist(
        (set) => ({
            saralanganIds: [],
            toggleSaralangan: (id) => set((state) => {
                const isExist = state.saralanganIds.includes(id);
                
                if (isExist) {
                    return { saralanganIds: state.saralanganIds.filter(itemId => itemId !== id) };
                } else {
                    return { saralanganIds: [...state.saralanganIds, id] };
                }
            }),
        }),
    )
);