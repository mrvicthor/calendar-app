import { createContext } from "react";

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  day: number;
};

type CalendarContext = {
  isCollapsed: boolean;
  navigateMonth: (direction: "prev" | "next") => void;
  calendarDays: CalendarDay[];
  isToday: (date: Date) => boolean;
  isSelected: (date: Date) => boolean | null;
  navigateToToday: () => void;
  isSameMonth: (date: Date) => boolean;
  toggleCollapse: () => void;
  currentMonth: number;
  currentYear: number;
  presentDay: number;
  handleDateClick: (date: Date) => void;
};

export const CalendarContext = createContext<CalendarContext | undefined>(
  undefined
);
