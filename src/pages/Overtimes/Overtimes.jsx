import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PlusSmIcon, PencilAltIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
//containers
import PageHeader from "containers/PageHeader";
import PageFilter from "containers/PageFilter";
//shared
import Table from "shared/Table";
//api
import { deleteOvertime, getOvertimes } from "api/overtimes";
//utils
import { formatDDMMYYYY } from "utils/formatDate";
import Loading from "shared/Loading";

export default function Overtimes() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [overtimes, setOvertimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const createOvertime = () => {
    navigate("/overtimes/new");
  };

  const editOvertime = (id) => {
    navigate(`/overtimes/${id}/edit`);
  };

  const onSubmit = (data) => {
    console.log("search submit", data);
  };

  const handleDeleteOvertime = async (id) => {
    const { status } = await deleteOvertime(id);
    if (status === 204) fetchAllOvertimes();
  };

  const pageBtn = {
    icon: PlusSmIcon,
    text: "Add Overtime",
    onClick: createOvertime,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search by Name",
      placeholder: "Michael",
      ...register("name"),
    },
    { type: "month", label: "From", ...register("from") },
    { type: "month", label: "To", ...register("to") },
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

  const actions = [
    {
      type: "button",
      icon: PencilAltIcon,
      color: "primary",
      onClick: (id) => editOvertime(id),
    },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeleteOvertime(id),
    },
  ];

  const fetchAllOvertimes = async () => {
    try {
      const {
        data: { status, data },
      } = await getOvertimes();
      if (status === "success") {
        setOvertimes(
          data.map((overtime) => ({
            id: overtime._id,
            employee: overtime.employee?.name,
            startDate: formatDDMMYYYY(overtime.startDate),
            endDate: formatDDMMYYYY(overtime.endDate),
            numberOfDays: overtime.monthAndDuration.numberOfDays,
            reason: overtime.reason,
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
    fetchAllOvertimes();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Overtimes" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table
          labels={labels}
          keys={keys}
          items={overtimes}
          actions={actions}
        />
      )}
    </div>
  );
}
