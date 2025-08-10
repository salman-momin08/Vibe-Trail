
import { create } from 'zustand';
import { SummarizeVibeOutput } from '@/ai/flows/summarizeVibeFlow';

type EventState = {
  eventType: string | null;
  guests: number | null;
  venue: string | null; 
  vibe: string | null;
  vibeSummary: SummarizeVibeOutput | null;
  setEventType: (type: string) => void;
  setGuests: (count: number) => void;
  setVenue: (venue: string) => void;
  setVibe: (vibe: string) => void;
  setVibeSummary: (summary: SummarizeVibeOutput) => void;
};

export const useEventStore = create<EventState>((set) => ({
  eventType: null,
  guests: null,
  venue: null,
  vibe: null,
  vibeSummary: null,
  setEventType: (type) => set({ eventType: type }),
  setGuests: (count) => set({ guests: count }),
  setVenue: (venue) => set({ venue }),
  setVibe: (vibe) => set({ vibe }),
  setVibeSummary: (summary) => set({ vibeSummary: summary }),
}));
