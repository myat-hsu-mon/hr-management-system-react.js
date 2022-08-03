import { service } from "config/service";

export const verifyToken = () =>
  service({
    method: "POST",
    url: `auth/token/verify`,
  });

export const signIn = (body) =>
  service({
    method: "POST",
    url: `auth/sign-in`,
    data: JSON.stringify(body),
  });
