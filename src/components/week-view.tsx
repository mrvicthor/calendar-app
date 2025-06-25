import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { TIME_SLOTS } from "../utils";
import { timeToMinutes } from "../utils/timeToMinutes";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekView = () => {
  const {
    getWeekStart,
    currentDate,
    isToday,
    toggleModal,
    handleViewDateClick,
  } = useCalendarContext();
  const { events, handleSelectEvent, toggleEvent } = useEventsContext();
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

  const now = new Date();

  const minutesInDay = isToday(currentDate)
    ? now.getHours() * 60 + now.getMinutes()
    : 0;
  const slotHeight = 60;
  const topOffsetRem = (minutesInDay * 3.125) / slotHeight;
  console.log({ topOffsetRem });

  return (
    <section className="h-full">
      <div className="grid grid-cols-8 gap-0">
        <div className="w-full p-2 " />

        {weekDates.map((date, index) => (
          <div
            key={index}
            className=" pb-2 flex flex-col justify-center items-center"
          >
            <div className="text-[#444746] text-xs">{days[index]}</div>
            <button
              aria-label={date.getDate().toString()}
              onClick={() => handleViewDateClick(date)}
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
      <div className="flex flex-col overflow-y-auto max-h-[calc(100dvh-14rem)]">
        {TIME_SLOTS.map((time, index) => (
          <div key={index} className="grid grid-cols-8  min-h-[3.125rem]">
            <span className=" text-xs text-right -top-2 relative z-20 px-2">
              {time}
            </span>
            {weekDates.map((date, dayIndex) => {
              const dayEvents = getEventsForDateAndTime(date, time);
              const slotMinutes = timeToMinutes(time);
              const nextSlotMinutes = timeToMinutes(
                TIME_SLOTS[index + 1] || "24:00"
              );
              const isCurrentTimeSlot =
                isToday(date) &&
                slotMinutes <= minutesInDay &&
                nextSlotMinutes > minutesInDay;
              return (
                <div
                  key={dayIndex}
                  onClick={() => {
                    toggleModal();
                  }}
                  className="border border-gray-200 cursor-pointer relative"
                >
                  {isCurrentTimeSlot && (
                    <div
                      style={{ top: `${topOffsetRem}px` }}
                      className="bg-red-400 absolute left-0 w-full h-0.5 z-40 transition-all duration-500 ease-in-out"
                    />
                  )}
                  {dayEvents.map((event, index) => (
                    <div
                      className="absolute left-0 right-0 bg-blue-100 border-l-2 border-blue-500 p-1 mb-1 rounded text-xs group overflow-hidden"
                      key={event.id}
                      style={{
                        top: `${index * 24}px`,
                        height: "22px",
                        zIndex: 10,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectEvent(event);
                        toggleEvent();
                      }}
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
