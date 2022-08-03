import { CircularButton } from "./Button";
import NoResultFound from "./NoResultFound";

export default function Table({ labels, keys, items, actions = [], text }) {
  if (!items.length) return <NoResultFound text={`No ${text} Found!`} />;
  return (
    <div className="flex flex-col dark:bg-secondary-400">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-white dark:bg-secondary-400">
                <tr>
                  {labels.map((label) => (
                    <th
                      key={label}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-100 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-secondary-100 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, itemIdx) => (
                  <tr
                    key={itemIdx}
                    className={`${
                      itemIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } dark:bg-secondary-400 `}
                  >
                    {keys.map((key) => (
                      <td
                        key={key.name}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-secondary-200"
                      >
                        {key.render
                          ? key.render(item[key.name])
                          : item[key.name]}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {actions.map((action) => (
                          <CircularButton
                            key={action.icon}
                            icon={action.icon}
                            color={action.color}
                            onClick={() => action.onClick(item.id)}
                          />
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
