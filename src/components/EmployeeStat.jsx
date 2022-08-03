export default function EmployeeStat({ data = [], designations, title }) {
  return (
    <div className="rounded-lg p-6 bg-indigo-100 space-y-2">
      <div className="pl-3 pb-1 flex items-center space-x-3">
        <div
          className={`w-3 h-3 ${
            title === "Technical Hiring" ? "bg-indigo-500" : "bg-green-500"
          }`}
        ></div>
        <h4>{title}</h4>
      </div>
      {data.map((stat) => (
        <div className="flex items-center space-x-4 rounded-full h-12 bg-indigo-50 py-1">
          <div
            className={`flex items-center justify-center h-12 w-12 rounded-full text-white text-2xl ${
              title === "Technical Hiring" ? "bg-yellow-400" : "bg-orange-500"
            }`}
          >
            {stat.totalCount}
          </div>
          <p className="text-black text-sm italic">
            {
              designations.find((designation) => designation._id === stat._id)
                .name
            }
          </p>
        </div>
      ))}
    </div>
  );
}
