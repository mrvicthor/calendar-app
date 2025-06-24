import {
  MdMenu,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdAdd,
} from "react-icons/md";
import { FaCaretDown } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";
import { useCalendarContext } from "../hooks/useCalendarContext";
import type { Layout } from "../types/context";

const Header = () => {
  const {
    presentDay,
    currentDate,
    navigateToToday,
    layout,
    toggleLayout,
    showLayout,
    handleSelectLayout,
    navigateMonth,
    toggleModal,
    setSelectedDate,
    getLayoutTitle,
  } = useCalendarContext();
  const layoutOptions = [
    { id: 1, name: "Week" },
    { id: 2, name: "Month" },
    { id: 3, name: "Day" },
  ];

  return (
    <>
      <header className="h-18">
        <nav className="flex items-center justify-between h-full gap-3">
          {layout === "Day" && (
            <button
              onClick={() => handleSelectLayout("Month")}
              className="md:hidden"
              aria-label="back"
            >
              <TbArrowBackUp size={24} />
            </button>
          )}
          <button aria-label="menu">
            <MdMenu size={24} />
          </button>
          <span className="h-8 w-8 rounded-full flex items-center justify-center border-2 border-blue-500">
            {presentDay}
          </span>{" "}
          <span className="capitalize">{getLayoutTitle()}</span>{" "}
          <button
            aria-label="today"
            onClick={navigateToToday}
            className="h-10 w-[6rem] rounded-3xl cursor-pointer border capitalize hover:bg-[#ECF4F4] ml-auto"
          >
            today
          </button>{" "}
          <div className="hidden md:flex items-center gap-1">
            <button
              aria-label="previous"
              onClick={() => navigateMonth("prev")}
              className="cursor-pointer h-7 w-7 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center"
            >
              <MdArrowBackIos />
            </button>
            <button
              aria-label="next"
              onClick={() => navigateMonth("next")}
              className="cursor-pointer h-7 w-7 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center"
            >
              <MdArrowForwardIos />
            </button>
          </div>
          <button
            onClick={() => {
              toggleModal();
              setSelectedDate(currentDate);
            }}
            aria-label="create event"
            className="cursor-pointer md:hidden"
          >
            <MdAdd />
          </button>
          <button
            aria-label={layout}
            onClick={toggleLayout}
            className="h-10 w-[6rem] rounded-3xl cursor-pointer border capitalize hover:bg-[#ECF4F4] md:flex items-center justify-center gap-2 hidden"
          >
            {layout} <FaCaretDown />
          </button>
        </nav>
      </header>
      {showLayout && (
        <ul className="bg-[#E4E4E3] shadow-md py-4 fixed right-8 w-28 rounded-md md:flex flex-col gap-4 z-50 hidden">
          {layoutOptions.map((option) => (
            <li
              className="hover:bg-[#ECFCFC] cursor-pointer px-4 py-2"
              onClick={() => {
                toggleLayout();
                handleSelectLayout(option.name as Layout);
              }}
              key={option.id}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Header;
