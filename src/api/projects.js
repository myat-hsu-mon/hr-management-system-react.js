import { service } from "config/service";

export const getProjects = () =>
  service({
    method: "GET",
    url: `projects`,
  });

export const createProject = (body) =>
  service({
    method: "POST",
    url: `projects`,
    data: JSON.stringify(body),
  });

export const getProject = (id) =>
  service({
    method: "GET",
    url: `projects/${id}`,
  });

export const updateProject = (id, body) =>
  service({
    method: "PUT",
    url: `projects/${id}`,
    data: JSON.stringify(body),
  });

export const deleteProject = (id) =>
  service({
    method: "DELETE",
    url: `projects/${id}`,
  });
