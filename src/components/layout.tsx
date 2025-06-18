// import { useCalendarContext } from "../hooks/useCalendarContext";

import DayView from "./day-view";

const Layout = () => {
  // const { isToday, calendarDays, currentDate } = useCalendarContext();

  //   const currentWeek = [];

  return (
    <section className="pt-2 max-h-full bg-white overflow-hidden rounded-xl">
      <DayView />
    </section>
  );
};

export default Layout;
