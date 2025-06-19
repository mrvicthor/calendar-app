import { MdMenu, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa6";
import { useCalendarContext } from "../hooks/useCalendarContext";
import { MONTHS } from "../utils";
import type { Layout } from "../types/context";

const Header = () => {
  const {
    presentDay,
    currentYear,
    currentMonth,
    navigateToToday,
    layout,
    toggleLayout,
    showLayout,
    handleSelectLayout,
    navigateMonth,
  } = useCalendarContext();
  const layoutOptions = [
    { id: 1, name: "Week" },
    { id: 2, name: "Month" },
    { id: 3, name: "Day" },
  ];
  return (
    <>
      <header className="px-4 h-18">
        <nav className="flex items-center justify-between h-full gap-3">
          <button>
            <MdMenu size={24} />
          </button>
          <span>{presentDay}</span>{" "}
          <span className="capitalize mr-auto">calendar</span>{" "}
          <button
            onClick={navigateToToday}
            className="h-10 w-[6rem] rounded-3xl cursor-pointer border capitalize hover:bg-[#ECF4F4]"
          >
            today
          </button>{" "}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth("prev")}
              className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center"
            >
              <MdArrowBackIos />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center"
            >
              <MdArrowForwardIos />
            </button>
            <span className="hidden md:block">
              {MONTHS[currentMonth]} {currentYear}
            </span>
          </div>
          <button
            onClick={toggleLayout}
            className="h-10 w-[6rem] rounded-3xl cursor-pointer border capitalize hover:bg-[#ECF4F4] flex items-center justify-center gap-2"
          >
            {layout} <FaCaretDown />
          </button>
        </nav>
      </header>
      {showLayout && (
        <ul className="bg-[#E4E4E3] shadow-md py-4 fixed right-8 w-28 rounded-md flex flex-col gap-4 z-50">
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
