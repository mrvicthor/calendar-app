import { useState } from "react";
import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEvents } from "../hooks/useEvents";
import { capitalizeWords } from "../utils/capilizeWords";

const CreateEvent = () => {
  const { eventModalTime, eventModalDate, currentDate, toggleModal } =
    useCalendarContext();
  const { addEvent } = useEvents();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(eventModalTime || "09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    const formattedText = capitalizeWords(title);
    addEvent({
      title: formattedText,
      date: eventModalDate,
      startTime,
      endTime,
      description: description.trim(),
    });
    setTitle("");
    setStartTime(eventModalTime || "09:00");
    setEndTime("10:00");
    setDescription("");
    toggleModal();
  };

  const handleClose = () => {
    setTitle("");
    setStartTime(eventModalTime || "09:00");
    setEndTime("10:00");
    setDescription("");
    toggleModal();
  };

  return (
    <>
      <div className="fixed w-screen  bg-black/10 h-screen top-0" />
      <section className="sm:max-w-md w-[40rem] fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-50 bg-white px-4 py-3 rounded-2xl space-y-4">
        <h2 className="capitalize font-bold">add event</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Add title and time"
              className="border-0 border-b border-gray-300 focus:border-blue-500 outline-none w-full py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p className="font-bold capitalize">date</p>
            <p className="text-gray-400">
              {eventModalDate.toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <input type="hidden" value={eventModalDate.toDateString()} />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="startTime" className="capitalize font-bold">
                start time
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="endTime" className="capitalize font-bold">
                end time
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="capitalize font-bold">
              description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              rows={4}
              className="border border-gray-300 px-2 py-1 rounded-md"
            />
          </div>
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={handleClose}
              className="py-2 px-3 border border-gray-300 text-black capitalize rounded-lg cursor-pointer"
            >
              cancel
            </button>
            <button
              disabled={!title}
              className="py-2 px-3 bg-blue-400 capitalize rounded-lg text-white"
            >
              save event
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateEvent;
