import { createContext } from "react";
import type { CalendarEvent } from ".";

type EventsContextType = {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForWeek: (startDate: Date) => CalendarEvent[];
};

export const EventsContext = createContext<EventsContextType | undefined>(
  undefined
);
