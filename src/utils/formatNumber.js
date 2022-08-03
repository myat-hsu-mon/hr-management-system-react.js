export const formatIntl = (number) => {
  if (!number) return 0;
  return new Intl.NumberFormat("en-In", { maximumSignificantDigits: 3 }).format(
    number
  );
};
