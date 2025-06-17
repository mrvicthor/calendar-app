import { MdMenu, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useCalendarContext } from "../hooks/useCalendarContext";
import { MONTHS } from "../utils";

const Header = () => {
  const { presentDay, currentYear, currentMonth } = useCalendarContext();
  return (
    <header className="px-4 h-18">
      <nav className="flex items-center justify-between h-full gap-3">
        <button>
          <MdMenu size={24} />
        </button>
        <span>{presentDay}</span>{" "}
        <span className="capitalize mr-auto">calendar</span>{" "}
        <button className="h-10 w-[6rem] rounded-3xl cursor-pointer border capitalize">
          today
        </button>{" "}
        <div className="flex items-center gap-1">
          <button className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center">
            <MdArrowBackIos />
          </button>
          <button className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#ECF4F4] flex items-center justify-center">
            <MdArrowForwardIos />
          </button>
          <span className="hidden md:block">
            {MONTHS[currentMonth]} {currentYear}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
