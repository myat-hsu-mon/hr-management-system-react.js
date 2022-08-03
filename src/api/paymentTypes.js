import { service } from "config/service";

export const getPaymentTypes = () =>
  service({
    method: "GET",
    url: `paymentTypes`,
  });

export const createPaymentType = (body) =>
  service({
    method: "POST",
    url: `paymentTypes`,
    data: JSON.stringify(body),
  });

export const getPaymentType = (id) =>
  service({
    method: "GET",
    url: `paymentTypes/${id}`,
  });

export const updatePaymentType = (id, body) =>
  service({
    method: "PUT",
    url: `paymentTypes/${id}`,
    data: JSON.stringify(body),
  });

export const deletePaymentType = (id) =>
  service({
    method: "DELETE",
    url: `paymentTypes/${id}`,
  });
