import { useCalendarContext } from "../hooks/useCalendarContext";
import { TIME_SLOTS } from "../utils";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekView = () => {
  const { getWeekStart, currentDate, isToday } = useCalendarContext();
  const startDate = getWeekStart(currentDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return (
    <section>
      <div className="ml-16 grid grid-cols-7">
        {days.map((day, index) => (
          <div key={index} className="text-[#444746] text-xs pl-2">
            {day}
          </div>
        ))}
        {weekDates.map((date, index) => (
          <button
            className={`h-10 w-10 rounded-full text-2xl font-medium flex items-center justify-center cursor-pointer ${
              isToday(date)
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "hover:bg-gray-100"
            }`}
            key={index}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
      <ul className=" overflow-y-auto">
        {TIME_SLOTS.map((time, index) => (
          <li key={index} className="grid grid-cols-7">
            {time}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeekView;
