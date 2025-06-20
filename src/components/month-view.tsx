import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEventsContext } from "../hooks/useEventsContext";
import { DAYS } from "../utils";

const MonthView = () => {
  const {
    calendarDays,
    isToday,
    isNavigatedDate,
    handleDateClick,
    toggleModal,
    setSelectedDate,
  } = useCalendarContext();
  const { events, handleSelectEvent, toggleEvent } = useEventsContext();

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };
  return (
    <section className="grid grid-cols-7 gap-0 h-full">
      {DAYS.map((day) => (
        <div
          key={day}
          className="text-center text-sm border-r border-r-[#DDE3E9] text-[#444746] uppercase"
        >
          {day}
        </div>
      ))}
      {calendarDays.map((dayInfo, index) => {
        const { date, day, isCurrentMonth } = dayInfo;
        const dayEvents = getEventsForDate(date);
        return (
          <div
            key={index}
            onClick={() => {
              toggleModal();
              setSelectedDate(date);
            }}
            className="border-r-[1px] flex flex-col gap-1 items-center border-b border-b-[#DDE3E9] border-r-[#DDE3E9] last:border-r-0 min-h-[120px] p-1 cursor-pointer hover:bg-gray-50"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleDateClick(date);
              }}
              className={`text-xs h-6 w-6 flex items-center justify-center rounded-full ${
                isToday(date)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "hover:bg-gray-100"
              } ${!isCurrentMonth && "text-gray-400 hover:text-gray-600"} ${
                isNavigatedDate(date) && "bg-[#ECFCFC]"
              } `}
            >
              {day}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectEvent(event);
                    toggleEvent();
                  }}
                  key={event.id}
                  className="bg-blue-100 text-blue-900 text-xs p-1 rounded truncate"
                  title={`${event.title} (${event.startTime} - ${event.endTime})`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MonthView;
