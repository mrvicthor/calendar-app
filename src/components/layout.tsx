import { createPortal } from "react-dom";
import { useCalendarContext } from "../hooks/useCalendarContext";

import DayView from "./day-view";
import MonthView from "./month-view";
import WeekView from "./week-view";
import CreateEvent from "./create-event";

const Layout = () => {
  const { layout, showForm } = useCalendarContext();

  //   const currentWeek = [];

  return (
    <section className="pt-2 max-h-full bg-white overflow-hidden rounded-xl">
      {layout === "Day" && <DayView />}
      {layout === "Month" && <MonthView />}
      {layout === "Week" && <WeekView />}
      {showForm && createPortal(<CreateEvent />, document.body)}
    </section>
  );
};

export default Layout;
