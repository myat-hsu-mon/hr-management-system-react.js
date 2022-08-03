import { useForm } from "react-hook-form";
//containers
import PageFilter from "containers/PageFilter";
//shared
import Card from "shared/Card";
import Table from "shared/Table";
//utils
import { formatDDMMYYYY } from "utils/formatDate";

export default function Leaves({ leaves }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const filters = [
    { type: "month", label: "From", ...register("from") },
    { type: "month", label: "To", ...register("to") },
    { type: "submit", text: "Search" },
  ];

  const labels = [
    "Name",
    "Start Date",
    "End Date",
    "Number of Days",
    "Leave Type",
    "Leave Reason",
  ];

  const keys = [
    { name: "employee" },
    { name: "startDate" },
    { name: "endDate" },
    { name: "numberOfDays" },
    { name: "leaveType" },
    { name: "leaveReason" },
  ];

  return (
    <div>
      <Card className="my-4">
        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PageFilter filters={filters} />
            <Table
              labels={labels}
              keys={keys}
              items={leaves.map((leave) => ({
                employee: leave.employee.name,
                startDate: formatDDMMYYYY(leave.startDate),
                endDate: formatDDMMYYYY(leave.endDate),
                numberOfDays: leave.monthAndDuration.numberOfDays,
                leaveType: leave.leaveType.name,
                leaveReason: leave.leaveReason,
              }))}
              text="Leaves"
            />
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
