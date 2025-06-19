import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { TIME_SLOTS } from "../utils";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekView = () => {
  const { getWeekStart, currentDate, isToday, toggleModal, handleDateClick } =
    useCalendarContext();
  const { events } = useEventsContext();
  const startDate = getWeekStart(currentDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  const getEventsForDateAndTime = (date: Date, time: string) => {
    return events.filter((event) => {
      const eventHour = Number.parseInt(event.startTime.split(":")[0]);
      const slotHour = Number.parseInt(time.split(":")[0]);
      return (
        event.date.toDateString() === date.toDateString() &&
        eventHour === slotHour
      );
    });
  };
  return (
    <section className="h-full">
      <div className="ml-16 grid grid-cols-8 gap-0">
        <div className="w-20 p-2" />

        {weekDates.map((date, index) => (
          <div key={index} className="px-6 pb-2">
            <div className="text-[#444746] text-xs pl-2">{days[index]}</div>
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
          </div>
        ))}
      </div>
      <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-10rem)] ">
        {TIME_SLOTS.map((time, index) => (
          <div key={index} className="grid grid-cols-8  min-h-[3.125rem]">
            <span className=" text-xs text-right -top-2 relative z-20 px-2">
              {time}
            </span>
            {weekDates.map((date, dayIndex) => {
              const dayEvents = getEventsForDateAndTime(date, time);
              return (
                <div
                  key={dayIndex}
                  onClick={() => {
                    handleDateClick(date);
                    toggleModal();
                  }}
                  className="border border-gray-200 cursor-pointer"
                >
                  {dayEvents.map((event) => (
                    <div
                      className="bg-blue-100 border-l-2 border-blue-500 p-1 mb-1 rounded text-xs group relative"
                      key={event.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-blue-900 truncate">
                            {event.title}
                          </div>
                          <div className="text-blue-700 text-xs">
                            {event.startTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeekView;
