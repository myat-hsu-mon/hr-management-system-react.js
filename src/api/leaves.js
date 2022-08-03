import { service } from "config/service";

export const getLeaves = () =>
  service({
    method: "GET",
    url: `leaves`,
  });

export const createLeave = (body) =>
  service({
    method: "POST",
    url: `leaves`,
    data: JSON.stringify(body),
  });

export const getLeave = (id) =>
  service({
    method: "GET",
    url: `leaves/${id}`,
  });

export const updateLeave = (id, body) =>
  service({
    method: "PUT",
    url: `leaves/${id}`,
    data: JSON.stringify(body),
  });

export const deleteLeave = (id) =>
  service({
    method: "DELETE",
    url: `leaves/${id}`,
  });
