import { service } from "config/service";

export const getDepartments = () =>
  service({
    method: "GET",
    url: `departments`,
  });

export const createDepartment = (body) =>
  service({
    method: "POST",
    url: `departments`,
    data: JSON.stringify(body),
  });

export const getDepartment = (id) =>
  service({
    method: "GET",
    url: `departments/${id}`,
  });

export const updateDepartment = (id, body) =>
  service({
    method: "PUT",
    url: `departments/${id}`,
    data: JSON.stringify(body),
  });

export const deleteDepartment = (id) =>
  service({
    method: "DELETE",
    url: `departments/${id}`,
  });
