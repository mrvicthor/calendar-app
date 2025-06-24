import { MdClose } from "react-icons/md";
import { useEventsContext } from "../hooks/useEventsContext";

const EventModal = () => {
  const { selectedEvent, toggleEvent } = useEventsContext();
  return (
    <>
      <div
        className="fixed w-screen  bg-black/10 h-screen top-0"
        onClick={toggleEvent}
      />
      <section className="sm:max-w-md w-[90vw] max-w-[40rem]  fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-50 bg-white px-4 py-3 shadow:md rounded-2xl space-y-4">
        <div className="flex justify-end">
          <button
            onClick={toggleEvent}
            aria-label="close"
            className="h-8 w-8 rounded-full flex items-center cursor-pointer justify-center hover:bg-[#ECF4F4]"
          >
            <MdClose size={20} />
          </button>
        </div>
        <h2 className="font-bold text-2xl">{selectedEvent?.title}</h2>
        <div className="flex gap-4">
          <span className="text-sm">
            {new Date(selectedEvent?.date as Date).toLocaleDateString("en-GB", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-sm">
            {Number(selectedEvent?.startTime.split(":")[0]) > 11
              ? selectedEvent?.startTime + "pm"
              : selectedEvent?.startTime + "am"}{" "}
            -{" "}
            {Number(selectedEvent?.endTime.split(":")[0]) > 11
              ? selectedEvent?.endTime + "pm"
              : selectedEvent?.endTime + "am"}
          </span>
        </div>
        <p className="text-sm">{selectedEvent?.description}</p>
      </section>
    </>
  );
};

export default EventModal;
