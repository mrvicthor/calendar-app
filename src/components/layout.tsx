import { useCalendarContext } from "../hooks/useCalendarContext";

import DayView from "./day-view";
import MonthView from "./month-view";

const Layout = () => {
  const { isToday, calendarDays, currentDate, layout } = useCalendarContext();

  //   const currentWeek = [];

  return (
    <section className="pt-2 max-h-full bg-white overflow-hidden rounded-xl">
      {layout === "Day" && <DayView />}
      {layout === "Month" && <MonthView />}
      {}
    </section>
  );
};

export default Layout;
