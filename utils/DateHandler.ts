import { format } from "date-fns";

export function getCurrentDate() {
  const today = new Date();
  const todaysDate = format(today, "yyyy-MM-dd");

  return {
    todaysDate,
  };
}

export function getCurrentWeekDates() {
  const today = new Date();
  const currentDay = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + 1);
  const startOfCurrentWeek = format(monday, "yyyy-MM-dd");

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - currentDay));
  const endOfCurrentWeek = format(sunday, "yyyy-MM-dd");

  return {
    startOfCurrentWeek,
    endOfCurrentWeek,
  };
}

export function getLastWeekDates() {
  const today = new Date();
  const currentDay = today.getDay();

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - currentDay - 6);
  const startOfLastWeek = format(lastMonday, "yyyy-MM-dd");

  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - currentDay);
  const endOfLastWeek = format(lastSunday, "yyyy-MM-dd");

  return {
    startOfLastWeek,
    endOfLastWeek,
  };
}

export function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDate = new Date(year, month, 1);
  const startOfCurrentMonth = format(firstDate, "yyyy-MM-dd");

  const lastDate = new Date(year, month + 1, 0);
  const endOfCurrentMonth = format(lastDate, "yyyy-MM-dd");

  return {
    startOfCurrentMonth,
    endOfCurrentMonth,
  };
}

export function getLastMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDate = new Date(year, month - 1, 1);
  const startOfLastMonth = format(firstDate, "yyyy-MM-dd");

  const lastDate = new Date(year, month, 0);
  const endOfLastMonth = format(lastDate, "yyyy-MM-dd");

  return {
    startOfLastMonth,
    endOfLastMonth,
  };
}
