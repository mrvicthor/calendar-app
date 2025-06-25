import { useCalendarContext } from "../hooks/useCalendarContext";

import { useEventsContext } from "../hooks/useEventsContext";
import { TIME_SLOTS } from "../utils";

const DayView = () => {
  const { currentDate, toggleModal, handleDateClick } = useCalendarContext();
  const { getEventsForDate, toggleEvent, handleSelectEvent } =
    useEventsContext();
  const date = new Date(currentDate);
  const currentDay = date.getDate();

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const minutesInDay = isToday ? now.getHours() * 60 + now.getMinutes() : 0;

  const topOffsetRem = (minutesInDay * 3.125) / 60;

  const dayEvents = getEventsForDate(date);

  const getEventsForTimeSlot = (time: string) => {
    const slotEvents = dayEvents.filter((event) => {
      const eventHour = Number.parseInt(event.startTime.split(":")[0]);
      const slotHour = Number.parseInt(time.split(":")[0]);
      return eventHour === slotHour;
    });
    return slotEvents;
  };

  return (
    <>
      <div className="ml-24 grid grid-cols-7 gap-1">
        <h2 className="text-xs text-blue-500 uppercase pl-7">
          {date.toLocaleDateString("en-GB", {
            weekday: "short",
          })}
        </h2>
      </div>
      <section className="flex flex-col divide-gray-100 divide-y-2 h-full">
        <div className="flex gap-2 items-center px-14 h-10">
          <span className="text-xs">GMT+01</span>
          <div className="h-full bg-[#E4E4E3] w-[1px]" />
          <span
            className={`text-xl font-bold h-9 w-9 rounded-full px-2 py-1 flex items-center justify-center ${
              isToday ? "text-white bg-blue-500" : "text-gray-700 bg-gray-200"
            }`}
          >
            {currentDay}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pl-12 relative max-h-[calc(100vh-14rem)] overflow-x-hidden">
          <div className="grid grid-cols-1 relative">
            {isToday && (
              <div
                style={{ top: `${topOffsetRem}rem` }}
                className="bg-red-400 absolute left-[4rem] w-full h-0.5 z-40 transition-all duration-500 ease-in-out"
              />
            )}
            {TIME_SLOTS.map((time, index) => {
              const slotEvents = getEventsForTimeSlot(time);
              return (
                <div
                  onClick={() => {
                    handleDateClick(date);
                    toggleModal();
                  }}
                  className="border-b border-gray-200 h-[3.125rem] flex"
                  key={index}
                >
                  <div className="w-16 p-2 text-sm text-gray-500 border-r relative -top-4.5 bg-white border-gray-100">
                    {time}
                  </div>
                  <div className="flex-1 hover:bg-gray-50 cursor-pointer relative flex gap-1">
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectEvent(event);
                          toggleEvent();
                        }}
                        className="bg-blue-100 border-l-4 border-blue-500 p-2 rounded text-sm group relative"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-blue-900">
                              {event.title}
                            </div>
                            <div className="text-blue-700 text-xs">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DayView;
