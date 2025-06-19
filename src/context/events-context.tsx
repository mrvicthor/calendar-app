import React, { useCallback, useEffect, useState } from "react";
import type { CalendarEvent } from "../types";
import { EventsContext } from "../types/events";

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const eventsFromStorage = localStorage.getItem("events");
    if (eventsFromStorage) {
      const parsed = JSON.parse(eventsFromStorage);
      const withDates = parsed.map((event: CalendarEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(withDates);
    }
  }, []);

  const saveEventsToStorage = useCallback((eventsToSave: CalendarEvent[]) => {
    try {
      const serialized = JSON.stringify(eventsToSave);

      localStorage.setItem("events", serialized);

      return true;
    } catch (error) {
      console.error("❌ Failed to save to localStorage:", error);
      return false;
    }
  }, []);

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
      date: new Date(event.date),
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEventsToStorage(updatedEvents);
  };

  const getEventsForDate = (date: Date) =>
    events.filter((event) => event.date.toDateString() === date.toDateString());

  const getEventsForWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return events.filter(
      (event) => event.date >= startDate && event.date <= endDate
    );
  };
  return (
    <EventsContext.Provider
      value={{ events, addEvent, getEventsForDate, getEventsForWeek }}
    >
      {children}
    </EventsContext.Provider>
  );
};
