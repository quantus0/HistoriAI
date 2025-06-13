import { useEffect } from "react";
import { Timeline as VisTimeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

export default function Timeline({ events }) {
  useEffect(() => {
    const container = document.getElementById("timeline");
    const items = events.map((event, index) => ({
      id: index,
      content: event.title,
      start: new Date(event.year, 0, 1),
    }));
    const options = { height: "200px" };
    new VisTimeline(container, items, options);
  }, [events]);

  return <div id="timeline" className="mb-4" />;
}