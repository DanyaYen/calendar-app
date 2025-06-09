import { useMemo } from "react";

export const useCalendarLogic = (currentDate: Date) => {
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

    const grid: Date[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0);
      prevMonthDay.setDate(prevMonthDay.getDate() - i);
      grid.unshift(prevMonthDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(new Date(year, month, i));
    }

    const remainingCells = 42 - grid.length;
    for (let i = 1; i <= remainingCells; i++) {
      grid.push(new Date(year, month + 1, i));
    }

    return grid;
  }, [currentDate]);

  return calendarGrid;
};
