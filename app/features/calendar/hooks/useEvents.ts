import { useState, useCallback } from "react";
import type { CalendarEvent } from "../types/event";

export function useEvents(initialEvents: CalendarEvent[] = []) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    setEvents((prev) => [...prev, { ...event, id: crypto.randomUUID() }]);
  }, []);

  const removeEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  return {
    events,
    addEvent,
    removeEvent,
  };
}
