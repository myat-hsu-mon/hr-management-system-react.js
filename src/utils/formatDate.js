import moment from "moment";

export const formatDDMMYYYY = (date) => moment(date).format("DD-MM-YYYY");

export const formatYYYYMMDD = (date) => moment(date).format("YYYY-MM-DD");

export const formatMonth = (date) => moment(date).format("YYYY-MM");

export const formatMMMYYYY = (date) => moment(date).format("MMM, YYYY");
