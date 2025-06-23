import { useCalendarContext } from "../hooks/useCalendarContext";
import DayView from "./day-view";
import MonthView from "./month-view";
import WeekView from "./week-view";

import MobileView from "./mobile-view";

const Layout = () => {
  const { layout } = useCalendarContext();

  return (
    <section className="pt-2 bg-white overflow-hidden rounded-xl h-full">
      <section className="hidden md:block h-full">
        {layout === "Day" && <DayView />}
        {layout === "Month" && <MonthView />}
        {layout === "Week" && <WeekView />}
      </section>
      <section className="md:hidden h-full">
        {layout === "Day" ? <DayView /> : <MobileView />}
      </section>
    </section>
  );
};

export default Layout;
