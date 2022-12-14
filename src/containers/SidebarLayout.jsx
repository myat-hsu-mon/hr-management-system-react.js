import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  CashIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";

import { useTheme } from "hooks/useTheme";
import { useDispatch } from "react-redux";
import { setTheme, setLang } from "store/slices/themeSlice";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import SwitchToggle from "shared/Switch";
import { signOut } from "store/slices/userSlice";
import { PrimaryHeading } from "shared/Typography";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Employees", href: "/employees", icon: UsersIcon, current: false },
  { name: "Payroll", href: "/payroll", icon: CashIcon, current: false },
  { name: "Overtimes", href: "/overtimes", icon: CalendarIcon, current: false },
  { name: "Leaves", href: "/leaves", icon: InboxIcon, current: false },
  {
    name: "Promotions",
    href: "/promotions",
    icon: ChartBarIcon,
    current: false,
  },
  { name: "Projects", href: "/projects", icon: FolderIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarLayout({ children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { themeMode, lang } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(
    themeMode === "dark" ? true : false
  );

  const handleSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem("themeMode");
    localStorage.removeItem("lang");
    localStorage.removeItem("token");
  };

  const goToProfile = () => {
    navigate("/me");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  const userNavigation = [
    { name: "Your Profile", onClick: goToProfile },
    { name: "Settings", onClick: goToSettings },
    { name: "Sign out", onClick: handleSignOut },
  ];

  const changeThemeMode = () => {
    dispatch(setTheme(themeMode === "light" ? "dark" : "light"));
    localStorage.setItem("themeMode", themeMode === "light" ? "dark" : "light");
  };

  // const changeLanguage = () => {
  //   dispatch(setLang(lang === "en" ? "mm" : "en"));
  //   localStorage.setItem("lang", lang === "en" ? "mm" : "en");
  // };

  return (
    <>
      <div
        className={`${
          themeMode === "dark" ? "dark" : "light"
        } h-screen max-h-screen overflow-x-hidden overflow-y-auto custom-scrollbar`}
      >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className={`${
              themeMode === "dark" ? "dark" : "light"
            } fixed inset-0 flex z-40 md:hidden`}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-700 dark:bg-secondary-500">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-primary-800 dark:bg-gray-700 text-white"
                              : "text-primary-100 hover:bg-primary-600 dark:hover:bg-gray-700",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )
                        }
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-primary-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-primary-700 dark:bg-secondary-400 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow"
              /> */}
              <h1 className="text-white uppercase font-bold">
                HR Management System
              </h1>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-primary-800 dark:bg-gray-700 text-white"
                          : "text-primary-100 hover:bg-primary-600 dark:hover:bg-gray-700",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-primary-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-secondary-500 shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 dark:bg-secondary-500 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* <div>{t("login")}</div>
                <button
                  onClick={changeLanguage}
                  className="bg-primary-400 dark:bg-green-500 border-none text-white p-2"
                >
                  Change Language
                </button> */}
                <button
                  onClick={changeThemeMode}
                  className="border-none ml-3 flex align-items"
                >
                  <span className="mr-2 text-gray-500 dark:text-secondary-100">
                    Dark Mode
                  </span>
                  <SwitchToggle
                    enabled={switchEnabled}
                    setEnabled={setSwitchEnabled}
                  />
                </button>
                {/* <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={item.onClick}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="dark:bg-secondary-500 dark:border-gray-50 dark:border-t min-h-screen">
            <div className="p-4 min-h-full">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
