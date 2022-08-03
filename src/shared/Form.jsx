import { Fragment, forwardRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import HelperText from "../components/HelperText";

export const Input = forwardRef((props, ref) => (
  <div className={props?.className}>
    <label
      htmlFor={props.label}
      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {props.label}
    </label>
    <div className="mt-1">
      {props.type === "textarea" ? (
        <textarea
          rows={3}
          id={props.label}
          ref={ref}
          {...props}
          autoComplete="off"
          className={`dark:bg-secondary-300 ${
            props.className
          } dark:text-secondary-100 appearance-none block w-full px-3 py-2 border border-gray-300 focus:border-none rounded-md shadow-sm placeholder-gray-400 dark:placeholder-secondary-200 focus:outline-none ${
            props.error
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-primary-500"
          }
        ${props.disabled ? "cursor-not-allowed" : "cursor-default"}
        sm:text-sm`}
        />
      ) : (
        <input
          id={props.label}
          ref={ref}
          {...props}
          autoComplete="off"
          className={`dark:bg-secondary-300 dark:text-secondary-100 appearance-none block w-full px-3 py-2 border border-gray-300 focus:border-none rounded-md shadow-sm placeholder-gray-400 dark:placeholder-secondary-200 focus:outline-none ${
            props.error
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-primary-500"
          }
        ${props.disabled ? "cursor-not-allowed" : "cursor-default"}
        sm:text-sm`}
        />
      )}
      {props.error && <HelperText message={props.helpertext} />}
    </div>
  </div>
));

export const CheckboxInput = forwardRef(({ label, ...props }, ref) => (
  <div className="flex items-center">
    <input
      id={label}
      ref={ref}
      type="checkbox"
      {...props}
      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
    />
    <label
      htmlFor={label}
      className="ml-2 block text-sm text-gray-900 dark:text-secondary-100"
    >
      {label}
    </label>
  </div>
));

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export const SelectInput = forwardRef(
//   ({ items, label, selected, setSelected }, ref) => (
//     <Listbox value={selected} onChange={setSelected} ref={ref}>
//       {({ open }) => (
//         <>
//           <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-secondary-100">
//             {label}
//           </Listbox.Label>
//           <div className="mt-1 relative">
//             <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//               <span className="block truncate">{selected.name}</span>
//               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <SelectorIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                 {items.map((item) => (
//                   <Listbox.Option
//                     key={item.id}
//                     className={({ active }) =>
//                       classNames(
//                         active ? "text-white bg-indigo-600" : "text-gray-900",
//                         "cursor-default select-none relative py-2 pl-3 pr-9"
//                       )
//                     }
//                     value={item}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <span
//                           className={classNames(
//                             selected ? "font-semibold" : "font-normal",
//                             "block truncate"
//                           )}
//                         >
//                           {item.name}
//                         </span>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               active ? "text-white" : "text-indigo-600",
//                               "absolute inset-y-0 right-0 flex items-center pr-4"
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   )
// );

export const Select = forwardRef((props, ref) => (
  <div>
    <label
      htmlFor={props.label}
      className="block text-sm font-medium text-gray-700 dark:text-secondary-100"
    >
      {props.label}
    </label>
    <select
      ref={ref}
      id={props.label}
      name={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      {...props}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base dark:text-secondary-200 dark:bg-secondary-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {props.items.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
    {props.error && <HelperText message={props.helpertext} />}
  </div>
));
