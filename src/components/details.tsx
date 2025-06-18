import { useCalendarContext } from "../hooks/useCalendarContext";
import { DAYS } from "../utils";

const Details = () => {
  const { isToday, calendarDays, currentDate } = useCalendarContext();
  const today = new Date();
  //   const currentWeek = [];

  return (
    <section className="pt-2">
      <div className="ml-16 grid grid-cols-7 gap-1">
        {DAYS.map((day, index) => (
          <div className={`${isToday(today) && "bg-blue-500"}`} key={index}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border border-amber-300">
        {/* {weeks.filter(week => week.includes(currentDate)).map((dayInfo, index) => {
          const { date, , isCurrentMonth } = dayInfo;

          return (
            <button key={index} className="h-6 w-6">
              {day}
            </button>
          );
        })} */}
      </div>
    </section>
  );
};

export default Details;
