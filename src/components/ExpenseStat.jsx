import { formatIntl } from "utils/formatNumber";

export default function ExpenseStat({ data = [], title }) {
  return (
    <div className="max-w-2xl">
      <div className="pb-1 flex items-center space-x-3">
        <div
          className={`w-3 h-3 ${
            title === "Total Expenses" ? "bg-indigo-500" : "bg-green-500"
          }`}
        ></div>
        <h4>{title}</h4>
      </div>
      {data.map((stat) => (
        <div className="grid grid-cols-2 gap-4">
          <ExpenseCard text="Salaries" stat={stat.totalSalaries} />
          <ExpenseCard text="Overtimes" stat={stat.totalOvertimesAmount} />
          <ExpenseCard text="Allowances" stat={stat.totalAllowances} />
          <ExpenseCard text="Bonus" stat={stat.totalProjectBonus} />
        </div>
      ))}
    </div>
  );
}

const ExpenseCard = ({ text, stat }) => (
  <div className="py-3 px-6 rounded-md bg-slate-200 text-black uppercase divide-y divide-gray-400">
    <h3 className="pb-2 text-center font-bold text-sm text-gray-700">{text}</h3>
    <div className="h-16 flex items-center justify-center">
      {formatIntl(stat)} MMK
    </div>
  </div>
);
