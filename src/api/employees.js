import { service } from "config/service";

export const getEmployees = () =>
  service({
    method: "GET",
    url: `employees`,
  });

export const createEmployee = (body) =>
  service({
    method: "POST",
    url: `employees`,
    data: JSON.stringify(body),
  });

export const getEmployee = (id) =>
  service({
    method: "GET",
    url: `employees/${id}`,
  });

export const updateEmployee = (id, body) =>
  service({
    method: "PUT",
    url: `employees/${id}`,
    data: JSON.stringify(body),
  });

export const deleteEmployee = (id) =>
  service({
    method: "DELETE",
    url: `employees/${id}`,
  });

export const getTechnicalEmployees = () =>
  service({
    method: "GET",
    url: `employees/technical`,
  });

export const getNonTechnicalEmployees = () =>
  service({
    method: "GET",
    url: `employees/non-technical`,
  });
