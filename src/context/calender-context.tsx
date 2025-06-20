import React, { useState } from "react";
import {
  CalendarContext,
  type CalendarDay,
  type Layout,
} from "../types/context";
import { MONTHS } from "../utils";

export const CalenderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [layout, setLayout] = useState<Layout>("Month");
  const [showLayout, setShowLayout] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [eventModalTime, setEventModalTime] = useState<string>();
  const [eventModalDate, setEventModalDate] = useState<Date>(new Date());

  const handleTimeSlotClick = (date: Date, time: string) => {
    setEventModalTime(time);
    setEventModalDate(date);
    setShowForm(true);
  };

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

  const toggleModal = () => setShowForm(!showForm);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (layout === "Day") {
        newDate.setDate(prevDate.getDate() + (direction === "next" ? 1 : -1));
      } else if (layout === "Month") {
        newDate.setMonth(prevDate.getMonth() + (direction === "next" ? 1 : -1));
      } else {
        newDate.setDate(prevDate.getDate() + (direction === "next" ? 7 : -7));
      }
      return newDate;
    });
  };

  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  };

  const getLayoutTitle = () => {
    if (layout === "Day") {
      return currentDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (layout === "Week") {
      const weekStart = getWeekStart(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
      } else {
        return `${MONTHS[weekStart.getMonth()]} - ${
          MONTHS[weekEnd.getMonth()]
        } ${weekStart.getFullYear()}`;
      }
    } else {
      return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const toggleLayout = () => setShowLayout(!showLayout);

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isNavigatedDate = (date: Date) => {
    return date.toDateString() === currentDate.toDateString();
  };

  const isSameMonth = (date: Date) => {
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEventModalTime("09:00");
    if (layout !== "Day") {
      setCurrentDate(date);
      setLayout("Day");
    }
  };

  const handleSelectLayout = (value: Layout) => setLayout(value);

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
        layout,
        handleSelectLayout,
        showLayout,
        toggleLayout,
        currentDate,
        isNavigatedDate,
        getLayoutTitle,
        getWeekStart,
        showForm,
        toggleModal,
        eventModalTime,
        eventModalDate,
        handleTimeSlotClick,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
