import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setLang, setTheme } from "store/slices/themeSlice";
import { useTheme } from "hooks/useTheme";
import { useUser } from "hooks/useUsers";

import Routes from "routes/Routes";

function App() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { themeMode, lang } = useTheme();
  const userInfo = useUser();

  // const changeThemeMode = () => {
  //   dispatch(setTheme(themeMode === "light" ? "dark" : "light"));
  //   localStorage.setItem("themeMode", themeMode === "light" ? "dark" : "light");
  //   // dispatch(setLang(lang === "en" ? "mm" : "en"));
  // };

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  React.useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    localStorage.setItem("lang", lang);
  }, []);

  return (
    <div className={themeMode === "dark" ? "dark" : "light"}>
      {/* <button
        onClick={changeThemeMode}
        className="bg-red-400 dark:bg-blue-500 border-none text-white p-2"
      >
        Change Theme
      </button> */}
      <Routes />
    </div>
  );
}

export default App;
