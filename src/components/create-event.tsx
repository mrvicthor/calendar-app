import React, { useEffect, useState } from "react";
import { useCalendarContext } from "../hooks/useCalendarContext";
import { useEvents } from "../hooks/useEvents";
import { capitalizeWords } from "../utils/capilizeWords";

const CreateEvent = () => {
  const { eventModalTime, selectedDate, currentDate, toggleModal } =
    useCalendarContext();
  const { addEvent, events } = useEvents();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(eventModalTime || "09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const formattedText = capitalizeWords(title);
    console.log("🚀 Submitting event:", {
      title: formattedText,
      date: currentDate,
      startTime,
      endTime,
      description: description.trim(),
    });

    addEvent({
      title: formattedText,
      date: selectedDate as Date,
      startTime,
      endTime,
      description: description.trim(),
    });
    setTitle("");
    setStartTime(eventModalTime || "09:00");
    setEndTime("10:00");
    setDescription("");
    toggleModal();

    // Debug: Check localStorage after a short delay
    setTimeout(() => {
      const stored = localStorage.getItem("events");
      console.log("localStorage after event creation:", stored);
    }, 100);
  };

  const handleClose = () => {
    setTitle("");
    setStartTime(eventModalTime || "09:00");
    setEndTime("10:00");
    setDescription("");
    toggleModal();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Debug: Log when events change
  useEffect(() => {
    console.log("📊 CreateEvent - Events state changed:", events.length);
  }, [events]);

  return (
    <>
      <div className="fixed w-screen  bg-black/10 h-screen top-0" />
      <section
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-md w-[90vw] max-w-[40rem]  fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-50 bg-white px-4 py-3 rounded-2xl space-y-4"
      >
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
              {(selectedDate as Date).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <input
              type="hidden"
              value={(selectedDate as Date).toDateString()}
            />
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
              onChange={(e) => setDescription(e.target.value)}
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
              type="submit"
              disabled={!title}
              className="py-2 px-3 bg-blue-400 capitalize rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
