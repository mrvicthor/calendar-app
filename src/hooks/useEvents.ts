import { useState, useEffect } from "react";
import type { CalendarEvent } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const eventsFromStorage = localStorage.getItem("events");
    if (eventsFromStorage) {
      try {
        const parsed = JSON.parse(eventsFromStorage);
        const withDates = parsed.map((event: CalendarEvent) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(withDates);
      } catch (error) {
        console.error("Failed to parse events from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const getEventsForWeek = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return events.filter(
      (event) => event.date >= startDate && event.date <= endDate
    );
  };

  return { events, addEvent, getEventsForDate, getEventsForWeek };
}
