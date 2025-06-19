import { createContext } from "react";

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  day: number;
};

export type Layout = "Month" | "Week" | "Day";

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
  layout: string;
  handleSelectLayout: (value: Layout) => void;
  toggleLayout: () => void;
  showLayout: boolean;
  currentDate: Date;
  isNavigatedDate: (date: Date) => boolean;
  getLayoutTitle: () => string;
  getWeekStart: (date: Date) => Date;
};

export const CalendarContext = createContext<CalendarContext | undefined>(
  undefined
);
