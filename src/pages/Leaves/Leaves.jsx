import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PlusSmIcon, PencilAltIcon } from "@heroicons/react/solid";

import PageFilter from "containers/PageFilter";
import PageHeader from "containers/PageHeader";

import { employees, leaveStatus } from "data/data";

import Table from "shared/Table";
import { useLeaveTypes } from "hooks/useLeaveTypes";
import { deleteLeave, getLeaves } from "api/leaves";
import { formatDDMMYYYY } from "utils/formatDate";
import { TrashIcon } from "@heroicons/react/outline";
import Loading from "shared/Loading";

export default function Leaves() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [leaves, setLeaves] = useState([]);
  const [leaveTypes] = useLeaveTypes();
  const [loading, setLoading] = useState(true);

  const createLeave = () => {
    navigate("/leaves/new");
  };

  const editLeave = (id) => {
    navigate(`/leaves/${id}/edit`);
  };

  const onSubmit = (data) => {
    console.log("search submit", data);
  };

  const handleDeleteLeave = async (id) => {
    const { status } = await deleteLeave(id);
    if (status === 204) fetchAllLeaves();
  };

  const pageBtn = {
    icon: PlusSmIcon,
    text: "Add Leave",
    onClick: createLeave,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search by Name",
      placeholder: "Michael",
      ...register("employee"),
    },
    {
      type: "select",
      label: "Leave Type",
      items: leaveTypes,
      ...register("leaveType"),
    },
    {
      type: "select",
      label: "Leave Status",
      items: leaveStatus,
      ...register("leaveStatus"),
    },
    {
      type: "submit",
      text: "Search",
    },
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

  const actions = [
    {
      type: "button",
      icon: PencilAltIcon,
      color: "primary",
      onClick: (id) => editLeave(id),
    },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeleteLeave(id),
    },
  ];

  const fetchAllLeaves = async () => {
    try {
      const {
        data: { status, data },
      } = await getLeaves();
      if (status === "success") {
        setLeaves(
          data.map((leave) => ({
            id: leave._id,
            employee: leave.employee?.name,
            startDate: formatDDMMYYYY(leave.startDate),
            endDate: formatDDMMYYYY(leave.endDate),
            numberOfDays: leave.monthAndDuration.numberOfDays,
            leaveType: leave.leaveType.name,
            leaveReason: leave.leaveReason,
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
    fetchAllLeaves();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Leaves" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table labels={labels} keys={keys} items={leaves} actions={actions} />
      )}
    </div>
  );
}
