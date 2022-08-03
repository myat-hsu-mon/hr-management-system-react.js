import { service } from "config/service";

export const getPromotions = () =>
  service({
    method: "GET",
    url: `promotions`,
  });

export const createPromotion = (body) =>
  service({
    method: "POST",
    url: `promotions`,
    data: JSON.stringify(body),
  });

export const getPromotion = (id) =>
  service({
    method: "GET",
    url: `promotions/${id}`,
  });

export const updatePromotion = (id, body) =>
  service({
    method: "PUT",
    url: `promotions/${id}`,
    data: JSON.stringify(body),
  });

export const deletePromotion = (id) =>
  service({
    method: "DELETE",
    url: `promotions/${id}`,
  });
