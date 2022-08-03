import { service } from "config/service";

export const getPayrolls = () =>
  service({
    method: "GET",
    url: `payroll`,
  });

export const createPayroll = (body) =>
  service({
    method: "POST",
    url: `payroll`,
    data: JSON.stringify(body),
  });

export const getPayroll = (id) =>
  service({
    method: "GET",
    url: `payroll/${id}`,
  });

export const updatePayroll = (id, body) =>
  service({
    method: "PUT",
    url: `payroll/${id}`,
    data: JSON.stringify(body),
  });

export const deletePayroll = (id) =>
  service({
    method: "DELETE",
    url: `payroll/${id}`,
  });
