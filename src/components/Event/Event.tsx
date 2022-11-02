import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import EventChips from "./EventChips";
import { IEvent, EventPropWrapper } from "../EventList";

const Event = ({ event }: EventPropWrapper): JSX.Element => {
  return (
    <ListItem key={event.name}>
      <ListItemText style={{ fontSize: "20px" }} primary={event.name} />
      <EventChips event={event} />
    </ListItem>
  );
};

// prop is object "event"
Event.propTypes = {
  event: PropTypes.object
};

export default Event;
