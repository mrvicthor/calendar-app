import { useCalendarContext } from "../hooks/useCalendarContext";
import { TIME_SLOTS } from "../utils";

// const TIME_SLOTS = [
//   "",
//   "1 AM",
//   "2 AM",
//   "3 AM",
//   "4 AM",
//   "5 AM",
//   "6 AM",
//   "7 AM",
//   "8 AM",
//   "9 AM",
//   "10 AM",
//   "11 AM",
//   "12 PM",
//   "1 PM",
//   "2 PM",
//   "3 PM",
//   "4 PM",
//   "5 PM",
//   "6 PM",
//   "7 PM",
//   "8 PM",
//   "9 PM",
//   "10 PM",
//   "11 PM",
// ];

const DayView = () => {
  const { currentDate } = useCalendarContext();
  const date = new Date(currentDate);
  const currentDay = date.getDate();
  const minutesInDay = date.getHours() * 60 + date.getMinutes();

  const topOffsetRem = (minutesInDay * 3.125) / 60;
  //   console.log(minutes);
  return (
    <>
      <div className="ml-24 grid grid-cols-7 gap-1">
        <h2 className="text-xs text-blue-500 uppercase">
          {currentDate.toLocaleDateString("en-GB", {
            weekday: "short",
          })}
        </h2>
      </div>
      <section className="flex flex-col divide-gray-100 divide-y-2 h-full">
        <div className="flex gap-2 items-center px-8 h-10">
          <span className="text-xs">GMT+01</span>
          <div className="h-full bg-[#E4E4E3] w-0.5" />
          <span className="text-xl font-bold text-white bg-blue-500 h-9 w-9 rounded-full px-2 py-1 flex items-center justify-center">
            {currentDay}
          </span>
        </div>

        <ul className="flex-1 overflow-y-auto pl-12 relative">
          <div
            style={{ top: `${topOffsetRem}rem` }}
            className="bg-red-400 absolute left-[5.5rem] w-full h-0.5 z-50"
          />
          {TIME_SLOTS.map((time, index) => (
            <li
              className="border-b border-gray-200 min-h-[3.125rem] flex relative"
              key={index}
            >
              <span className="absolute -top-2.5 z-50 bg-white text-xs">
                {time}
              </span>
              <div className="min-h-full bg-[#E4E4E3] w-0.5 ml-10" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default DayView;
