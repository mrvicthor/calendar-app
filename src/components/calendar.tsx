import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { useCalendarContext } from "../hooks/useCalendarContext";
import { MONTHS } from "../utils";

const days = [
  { id: 1, day: "S", tooltip: "Sunday" },
  { id: 2, day: "M", tooltip: "Monday" },
  { id: 3, day: "T", tooltip: "Tuesday" },
  { id: 4, day: "W", tooltip: "Wednesday" },
  { id: 5, day: "T", tooltip: "Thursday" },
  { id: 6, day: "F", tooltip: "Friday" },
  { id: 7, day: "S", tooltip: "Saturday" },
];

const Calendar = () => {
  const {
    currentMonth,
    currentYear,
    calendarDays,
    handleDateClick,
    isToday,
    isSelected,
  } = useCalendarContext();
  return (
    <section>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span>{MONTHS[currentMonth]}</span>
          <span className="mr-auto">{currentYear}</span>{" "}
          <div className="flex items-center gap-1">
            <button className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center">
              <MdArrowBackIos size={14} />
            </button>
            <button className="cursor-pointer h-8 w-8 rounded-full flex items-center justify-center hover:bg-[#ECF4F4]">
              <MdArrowForwardIos size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((item) => (
            <div
              key={item.id}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {item.day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayInfo, index) => {
            const { date, day, isCurrentMonth } = dayInfo;
            console.log(isToday(date));
            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`h-10 w-full rounded-full p-0 font-normal  text-sm cursor-pointer ${
                  !isCurrentMonth && "text-gray-400 hover:text-gray-600"
                } ${
                  isToday(date)
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-gray-100"
                } ${
                  isSelected(date) &&
                  !isToday(date) &&
                  "bg-gray-200 hover:bg-gray-300"
                } ${isCurrentMonth && "text-gray-900"}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
