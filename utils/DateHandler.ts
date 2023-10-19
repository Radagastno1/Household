import { format } from "date-fns";

// Söndag = 0, Måndag = 1, Tisdag = 2, osv... Lördag = 6

// Gets the current weeks start- and end-date
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

// Gets the last weeks start- and end-date
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

// Gets the current months start- and end-date
export function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Skapa första dagen i den aktuella månaden
  const firstDate = new Date(year, month, 1);
  const startOfCurrentMonth = format(firstDate, "yyyy-MM-dd");

  // Skapa den sista dagen i den aktuella månaden
  const lastDate = new Date(year, month + 1, 0);
  const endOfCurrentMonth = format(lastDate, "yyyy-MM-dd");

  return {
    startOfCurrentMonth,
    endOfCurrentMonth,
  };
}

// Gets the last months start- and end-date
export function getLastMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Skapa första dagen i förra månaden
  const firstDate = new Date(year, month - 1, 1);
  const startOfLastMonth = format(firstDate, "yyyy-MM-dd");

  // Skapa den sista dagen i förra månaden
  const lastDate = new Date(year, month, 0);
  const endOfLastMonth = format(lastDate, "yyyy-MM-dd");

  return {
    startOfLastMonth,
    endOfLastMonth,
  };
}
