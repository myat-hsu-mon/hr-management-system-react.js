import { service } from "config/service";

export const getLeaveTypes = () =>
  service({
    method: "GET",
    url: `leaveTypes`,
  });

export const createLeaveType = (body) =>
  service({
    method: "POST",
    url: `leaveTypes`,
    data: JSON.stringify(body),
  });

export const getLeaveType = (id) =>
  service({
    method: "GET",
    url: `leaveTypes/${id}`,
  });

export const updateLeaveType = (id, body) =>
  service({
    method: "PUT",
    url: `leaveTypes/${id}`,
    data: JSON.stringify(body),
  });

export const deleteLeaveType = (id) =>
  service({
    method: "DELETE",
    url: `leaveTypes/${id}`,
  });
