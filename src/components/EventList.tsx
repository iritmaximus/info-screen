import React from "react";
import { List, Typography } from "@mui/material";
import useSWR from "swr";
import { red } from "@mui/material/colors";
import Event from "./Event/Event";

// TODO "x?: type" the optional ones
export interface IEvent {
  id: number;
  name: string;
  user_id: number;
  price: string;
  created: string;
  starts: string;
  registration_starts: string | null;
  registration_ends: string | null;
  cancellation_starts: string | null;
  location: string;
  category: string;
  description: string;
  deleted: number;
}

export interface EventPropWrapper {
  event: IEvent;
}

interface EventsObj {
  "This week": IEvent[] | undefined;
  "Next week": IEvent[] | undefined;
  Later: IEvent[] | undefined;
}

const subtitleHeadingStyle = {
  fontSize: "1.5rem",
  fontWeight: "700"
};
const errorHeadingStyle = {
  fontSize: "18px",
  fontWeight: "700",
  opacity: 0.5,
  color: red[500],
  marginBottom: "1rem"
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventList = (): JSX.Element => {
  const { data, error } = useSWR("/api/events/upcoming", fetcher, {
    refreshInterval: 5 * 60 * 1000 // 5 minutes
  });
  const events: EventsObj = data;

  return (
    <List dense={true}>
      {error && (
        <Typography variant="h3" sx={{ ...errorHeadingStyle }}>
          Failed to load events, this list may be out of date.
        </Typography>
      )}
      {events &&
        Object.entries(events).map(([subtitle, events]: [string, IEvent[]]) => (
          <React.Fragment key={subtitle}>
            <Typography variant="h3" sx={subtitleHeadingStyle}>
              {subtitle}
            </Typography>
            {events.map(event => (
              <Event key={event.id} event={event} />
            ))}
            <hr />
          </React.Fragment>
        ))}
    </List>
  );
};

export default EventList;
