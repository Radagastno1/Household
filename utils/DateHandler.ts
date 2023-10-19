import { format } from "date-fns";

export function getStartAndEndDateOfCurrentWeek() {
  const today = new Date();
  const currentDay = today.getDay();

  const startOfWeek = format(
    new Date(today.getDate() - currentDay + 1),
    "yyyy-MM-dd",
  );
  // startOfWeek.setDate(today.getDate() - currentDay + 1); // Sätt datum till måndag i den aktuella veckan

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - currentDay)); // Sätt datum till söndag i den aktuella veckan

  return {
    startOfWeek,
    endOfWeek,
  };
}

export function getStartAndEndDateOfLastWeek() {
  const today = new Date();
  const currentDay = today.getDay(); // Söndag = 0, Måndag = 1, Tisdag = 2, osv... Lördag = 6
  const lastWeekMonday = new Date(today);
  lastWeekMonday.setDate(today.getDate() - currentDay - 6); // Sätt datum till måndag i förra veckan

  const lastWeekSunday = new Date(today);
  lastWeekSunday.setDate(today.getDate() - currentDay); // Sätt datum till söndag i förra veckan

  return {
    lastWeekMonday,
    lastWeekSunday,
  };
}

export function getStartAndEndDateOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Skapa första dagen i den aktuella månaden
  const startOfCurrentMonth = new Date(year, month, 1);

  // Skapa den sista dagen i den aktuella månaden
  const endOfCurrentMonth = new Date(year, month + 1, 0);

  return {
    startOfCurrentMonth,
    endOfCurrentMonth,
  };
}

export function getStartAndEndDateOfLastMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Skapa första dagen i förra månaden
  const startOfLastMonth = new Date(year, month - 1, 1);

  // Skapa den sista dagen i förra månaden
  const endOfLastMonth = new Date(year, month, 0);

  return {
    startOfLastMonth,
    endOfLastMonth,
  };
}
