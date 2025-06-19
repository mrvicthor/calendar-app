import { useState, useEffect, useCallback } from "react";
import type { CalendarEvent } from "../types";

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadEvents = () => {
      try {
        const eventsFromStorage = localStorage.getItem("events");

        if (eventsFromStorage && eventsFromStorage !== "[]") {
          const parsed = JSON.parse(eventsFromStorage);
          const withDates = parsed.map((event: CalendarEvent) => ({
            ...event,
            date: new Date(event.date),
          }));

          setEvents(withDates);
        } else {
          console.log("No events in localStorage, starting with empty array");
          setEvents([]);
        }
      } catch (error) {
        console.error("Failed to parse events from localStorage:", error);
        setEvents([]);
      } finally {
        setIsLoaded(true);
        console.log("Events loading complete");
      }
    };

    loadEvents();
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

    const currentEvents = events;

    const updatedEvents = [...currentEvents, newEvent];

    saveEventsToStorage(updatedEvents);

    setEvents(updatedEvents);
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

  return { events, addEvent, getEventsForDate, getEventsForWeek, isLoaded };
}
