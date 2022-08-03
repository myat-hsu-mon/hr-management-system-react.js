import { service } from "config/service";

export const getOvertimes = () =>
  service({
    method: "GET",
    url: `overtimes`,
  });

export const createOvertime = (body) =>
  service({
    method: "POST",
    url: `overtimes`,
    data: JSON.stringify(body),
  });

export const getOvertime = (id) =>
  service({
    method: "GET",
    url: `overtimes/${id}`,
  });

export const updateOvertime = (id, body) =>
  service({
    method: "PUT",
    url: `overtimes/${id}`,
    data: JSON.stringify(body),
  });

export const deleteOvertime = (id) =>
  service({
    method: "DELETE",
    url: `overtimes/${id}`,
  });
