import { service } from "config/service";

export const getDesignations = () =>
  service({
    method: "GET",
    url: `designations`,
  });

export const createDesignation = (body) =>
  service({
    method: "POST",
    url: `designations`,
    data: JSON.stringify(body),
  });

export const getDesignation = (id) =>
  service({
    method: "GET",
    url: `designations/${id}`,
  });

export const updateDesignation = (id, body) =>
  service({
    method: "PUT",
    url: `designations/${id}`,
    data: JSON.stringify(body),
  });

export const deleteDesignation = (id) =>
  service({
    method: "DELETE",
    url: `designations/${id}`,
  });
