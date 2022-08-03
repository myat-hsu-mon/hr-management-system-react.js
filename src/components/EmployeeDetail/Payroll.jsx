import { useForm } from "react-hook-form";
//containers
import PageFilter from "containers/PageFilter";
//shared
import Card from "shared/Card";
import Table from "shared/Table";
import { formatMMMYYYY } from "utils/formatDate";

export default function Payroll({ payroll }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const pageFilters = [
    {
      type: "text",
      label: "Payslip ID",
      placeholder: "0001",
      ...register("payslipId"),
    },
    { type: "month", label: "From", ...register("from") },
    { type: "month", label: "To", ...register("to") },
    { type: "submit", text: "Search" },
  ];

  const labels = [
    "Payslip ID",
    "Month & Year",
    "Salary",
    "Project Bonus",
    "Other Allows",
    "Overtime days",
    "Overtimes Amount",
    "Other Deductions",
    "Leave days",
    "Leaves Amount",
    "Gross Earnings",
    "Total Deductions",
    "Net Pay",
  ];

  const keys = [
    { name: "id" },
    { name: "month" },
    { name: "salary" },
    { name: "projectBonus" },
    { name: "otherAllowances" },
    { name: "totalOvertimeDays" },
    { name: "totalOvertimeAmount" },
    { name: "otherDeductions" },
    { name: "totalLeaveDays" },
    { name: "totalLeaveAmount" },
    { name: "grossEarnings" },
    { name: "totalDeductions" },
    { name: "netPay" },
  ];

  return (
    <Card className="my-4">
      <Card.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageFilter filters={pageFilters} />
        </form>
        <Table
          labels={labels}
          keys={keys}
          items={payroll.map((payroll) => ({
            id: payroll._id,
            month: formatMMMYYYY(payroll.month),
            salary: payroll.salary,
            projectBonus: payroll.projectBonus,
            otherAllowances: payroll.otherAllowances,
            totalOvertimeDays: payroll.totalOvertimeDays,
            totalOvertimeAmount: payroll.totalOvertimeAmount,
            otherDeductions: payroll.otherDeductions,
            totalLeaveDays: payroll.totalLeaveDays,
            totalLeaveAmount: payroll.totalLeaveAmount,
            grossEarnings: payroll.grossEarnings,
            totalDeductions: payroll.totalDeductions,
            netPay: payroll.netPay,
          }))}
          text="Payroll"
        />
      </Card.Content>
    </Card>
  );
}
