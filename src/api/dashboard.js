import { service } from "config/service";

export const getTotalExpenses = () =>
  service({
    method: "GET",
    url: `total-expenses`,
  });

export const getMonthlyExpenses = () =>
  service({
    method: "GET",
    url: `monthly-expenses`,
  });
