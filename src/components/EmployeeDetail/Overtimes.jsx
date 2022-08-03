import { useForm } from "react-hook-form";
//containers
import PageFilter from "containers/PageFilter";
//shared
import Card from "shared/Card";
import Table from "shared/Table";
import NoResultFound from "shared/NoResultFound";
//utils
import { formatDDMMYYYY } from "utils/formatDate";

export default function Overtimes({ overtimes }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const filters = [
    { type: "month", label: "From", ...register("startingMonth") },
    { type: "month", label: "To", ...register("endingMonth") },
    { type: "submit", text: "Search" },
  ];

  const labels = ["Name", "Start Date", "End Date", "Number Of Days", "Reason"];

  const keys = [
    { name: "employee" },
    { name: "startDate" },
    { name: "endDate" },
    { name: "numberOfDays" },
    { name: "reason" },
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
              items={overtimes.map((overtime) => ({
                employee: overtime.employee.name,
                startDate: formatDDMMYYYY(overtime.startDate),
                endDate: formatDDMMYYYY(overtime.endDate),
                numberOfDays: overtime.monthAndDuration.numberOfDays,
                reason: overtime.reason,
              }))}
              text="Overtimes"
            />
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
