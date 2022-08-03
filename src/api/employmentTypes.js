import { service } from "config/service";

export const getEmploymentTypes = () =>
  service({
    method: "GET",
    url: `employmentTypes`,
  });

export const createEmploymentType = (body) =>
  service({
    method: "POST",
    url: `employmentTypes`,
    data: JSON.stringify(body),
  });

export const getEmploymentType = (id) =>
  service({
    method: "GET",
    url: `employmentTypes/${id}`,
  });

export const updateEmploymentType = (id, body) =>
  service({
    method: "PUT",
    url: `employmentTypes/${id}`,
    data: JSON.stringify(body),
  });

export const deleteEmploymentType = (id) =>
  service({
    method: "DELETE",
    url: `employmentTypes/${id}`,
  });
