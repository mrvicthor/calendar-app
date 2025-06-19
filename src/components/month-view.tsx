import { useCalendarContext } from "../hooks/useCalendarContext";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MonthView = () => {
  const { calendarDays, isToday, isNavigatedDate } = useCalendarContext();
  return (
    <section className="grid grid-cols-7 gap-0 h-full">
      {days.map((day) => (
        <div
          key={day}
          className="text-center text-sm border-r border-r-[#DDE3E9] text-[#444746]"
        >
          {day}
        </div>
      ))}
      {calendarDays.map((dayInfo, index) => {
        const { date, day, isCurrentMonth } = dayInfo;
        console.log(isCurrentMonth);
        return (
          <div
            key={index}
            className="border-r-[1px] flex justify-center border-b border-b-[#DDE3E9] border-r-[#DDE3E9] last:border-r-0 min-h-[120px] p-1 cursor-pointer hover:bg-gray-50"
          >
            <p
              className={`text-xs h-6 w-6 flex items-center justify-center rounded-full ${
                isToday(date)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "hover:bg-gray-100"
              } ${!isCurrentMonth && "text-gray-400 hover:text-gray-600"} ${
                isNavigatedDate(date) && "bg-[#ECFCFC]"
              } `}
            >
              {day}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default MonthView;
