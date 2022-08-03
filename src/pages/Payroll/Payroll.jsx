import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
//containers
import PageFilter from "containers/PageFilter";
import PageHeader from "containers/PageHeader";
//shared
import Table from "shared/Table";
//api
import { deletePayroll, getPayrolls } from "api/payrolls";
//hooks
import { useDesignation } from "hooks/useDesignations";
import { TrashIcon } from "@heroicons/react/outline";
import { DetailIcon } from "assets/icons/icon";
import Loading from "shared/Loading";
import { formatMMMYYYY } from "utils/formatDate";

export default function Payroll() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [designations] = useDesignation();
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  const createPayroll = () => {
    navigate("/payroll/new");
  };

  const editPayroll = (id) => {
    navigate(`/payroll/${id}/edit`);
  };

  const viewPayslipDetail = (id) => {
    navigate(`/payroll/${id}`);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDeletePayroll = async (id) => {
    const { status } = await deletePayroll(id);
    if (status === 204) fetchAllPayroll();
  };

  const pageBtn = {
    icon: PlusSmIcon,
    text: "Add Payroll",
    onClick: createPayroll,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search By Name",
      placeholder: "John Smith",
      ...register("name"),
    },
    {
      type: "select",
      label: "Designation",
      items: designations,
      ...register("designation"),
    },
    { type: "month", label: "From", ...register("from") },
    { type: "month", label: "To", ...register("to") },
    { type: "submit", text: "Search" },
  ];

  const labels = [
    "Name",
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
    { name: "name" },
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

  const actions = [
    { icon: PencilAltIcon, color: "primary", onClick: (id) => editPayroll(id) },
    { icon: DetailIcon, color: "primary", onClick: viewPayslipDetail },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeletePayroll(id),
    },
  ];

  const fetchAllPayroll = async () => {
    try {
      const {
        data: { status, data },
      } = await getPayrolls();
      if (status === "success") {
        setPayroll(
          data.map((payroll) => ({
            id: payroll._id,
            name: payroll.employee?.name,
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
          }))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPayroll();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Payroll" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table
          labels={labels}
          keys={keys}
          items={payroll}
          actions={actions}
          text="Projects"
        />
      )}
    </div>
  );
}
