import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/_index";

export function useCalendarEvents() {
  const { events: rawEvents } = useLoaderData<typeof loader>();

  return rawEvents.map((event) => ({
    ...event,
    date: new Date(event.date),
    requestDate: event.requestDate ? new Date(event.requestDate) : undefined,
    approvedDate: event.approvedDate ? new Date(event.approvedDate) : undefined,
    ...(event.isBirthday && {
      date: new Date(event.date),
    }),
  }));
}
