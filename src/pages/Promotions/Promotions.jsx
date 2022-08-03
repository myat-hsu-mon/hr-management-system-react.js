import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PencilAltIcon, PlusSmIcon } from "@heroicons/react/solid";

import PageFilter from "containers/PageFilter";
import PageHeader from "containers/PageHeader";

import Table from "shared/Table";

import { useDesignation } from "hooks/useDesignations";
import { deletePromotion, getPromotions } from "api/promotions";
import { formatDDMMYYYY } from "utils/formatDate";
import { TrashIcon } from "@heroicons/react/outline";
import Loading from "shared/Loading";

export default function Promotions() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [promotions, setPromotions] = useState([]);
  const [designations] = useDesignation();
  const [loading, setLoading] = useState(true);

  const createPromotion = () => {
    navigate("/promotions/new");
  };

  const editPromotion = (id) => {
    navigate(`/promotions/${id}/edit`);
  };

  const handleDeletePromotion = async (id) => {
    const { status } = await deletePromotion(id);
    if (status === 204) fetchAllPromotions();
  };

  const onSubmit = (data) => {
    console.log({ data });
  };

  const pageBtn = {
    icon: PlusSmIcon,
    text: "New Promotion",
    onClick: createPromotion,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search By Id",
      placeholder: "0001",
      ...register("id"),
    },
    {
      type: "text",
      label: "Search by Name",
      placeholder: "John Smith",
      ...register("employee"),
    },
    {
      type: "select",
      label: "Designation",
      items: designations,
      ...register("designation"),
    },
    { type: "submit", text: "Search" },
  ];

  const labels = [
    "Name",
    "Department",
    "Promoted From",
    "Promoted To",
    "Salary From",
    "Salary To",
    "Date",
  ];

  const keys = [
    { name: "name" },
    { name: "department" },
    { name: "promotedFrom" },
    { name: "promotedTo" },
    { name: "salaryFrom" },
    { name: "salaryTo" },
    { name: "date" },
  ];

  const actions = [
    {
      icon: PencilAltIcon,
      color: "primary",
      onClick: (id) => editPromotion(id),
      outline: true,
    },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeletePromotion(id),
    },
  ];

  const fetchAllPromotions = async () => {
    try {
      const {
        data: { status, data },
      } = await getPromotions();
      if (status === "success") {
        setPromotions(
          data.map((promotion) => ({
            id: promotion._id,
            name: promotion.employee?.name,
            department: promotion.department.name,
            promotedFrom: promotion.promotedFrom.name,
            promotedTo: promotion.promotedTo.name,
            salaryFrom: promotion.salaryFrom,
            salaryTo: promotion.salaryTo,
            date: formatDDMMYYYY(promotion.date),
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
    fetchAllPromotions();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Promotions" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table
          labels={labels}
          keys={keys}
          items={promotions}
          actions={actions}
          text="Promotions"
        />
      )}
    </div>
  );
}
