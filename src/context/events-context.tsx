import React, { useCallback, useEffect, useState } from "react";
import type { CalendarEvent } from "../types";
import { EventsContext } from "../types/events";
import mockEvents from "../mocks/mockEvents";

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [viewEvent, setViewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const toggleEvent = () => setViewEvent(!viewEvent);
  const handleSelectEvent = (value: CalendarEvent) => setSelectedEvent(value);

  useEffect(() => {
    const eventsFromStorage = localStorage.getItem("events");
    if (eventsFromStorage) {
      const parsed = JSON.parse(eventsFromStorage);
      const withDates = parsed.map((event: CalendarEvent) => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(withDates);
    } else {
      setEvents(mockEvents);
      localStorage.setItem("events", JSON.stringify(mockEvents));
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
      value={{
        events,
        addEvent,
        getEventsForDate,
        getEventsForWeek,
        viewEvent,
        toggleEvent,
        handleSelectEvent,
        selectedEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
