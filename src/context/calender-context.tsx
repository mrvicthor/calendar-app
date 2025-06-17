import React, { useState } from "react";
import { CalendarContext, type CalendarDay } from "../types/context";

export const CalenderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const presentDay = today.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const daysFromPreviousMonth = firstDayWeekday;
  const previousMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPreviousMonth = previousMonth.getDate();

  const totalCells = Math.ceil((daysFromPreviousMonth + daysInMonth) / 7) * 7;
  const daysFromNextMonth = totalCells - daysFromPreviousMonth - daysInMonth;

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(prevDate.getMonth() - 1);
      } else {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isSameMonth = (date: Date) => {
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const calendarDays: CalendarDay[] = [];

  for (
    let i = daysInPreviousMonth - daysFromPreviousMonth + 1;
    i <= daysInPreviousMonth;
    i += 1
  ) {
    const date = new Date(currentYear, currentMonth - 1, i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      day: i,
    });
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    const date = new Date(currentYear, currentMonth, i);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      day: i,
    });
  }

  for (let i = 1; i <= daysFromNextMonth; i += 1) {
    const date = new Date(currentYear, currentMonth + 1, i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      day: i,
    });
  }

  return (
    <CalendarContext.Provider
      value={{
        isCollapsed,
        navigateMonth,
        calendarDays,
        isToday,
        isSelected,
        navigateToToday,
        isSameMonth,
        toggleCollapse,
        currentMonth,
        currentYear,
        presentDay,
        handleDateClick,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
