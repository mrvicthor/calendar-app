import { createPortal } from "react-dom";
import { useCalendarContext } from "../hooks/useCalendarContext";
import DayView from "./day-view";
import MonthView from "./month-view";
import WeekView from "./week-view";
import CreateEvent from "./create-event";
import EventModal from "./event-modal";
import { useEventsContext } from "../hooks/useEventsContext";
import MobileView from "./mobile-view";

const Layout = () => {
  const { layout } = useCalendarContext();
  const { showForm } = useCalendarContext();
  const { viewEvent } = useEventsContext();
  return (
    <>
      <section className="pt-2 max-h-full bg-white overflow-hidden rounded-xl">
        <section className="hidden md:block">
          {layout === "Day" && <DayView />}
          {layout === "Month" && <MonthView />}
          {layout === "Week" && <WeekView />}
        </section>
        <section className="md:hidden">
          {layout === "Day" ? <DayView /> : <MobileView />}
        </section>
        {showForm && createPortal(<CreateEvent />, document.body)}
        {viewEvent && createPortal(<EventModal />, document.body)}
      </section>
    </>
  );
};

export default Layout;
