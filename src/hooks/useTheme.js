import { useSelector } from "react-redux";

export const useTheme = () => {
  return useSelector((state) => state.theme);
};
