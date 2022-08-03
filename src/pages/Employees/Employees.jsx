import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PlusIcon, DotsVerticalIcon } from "@heroicons/react/solid";

//containers
import PageFilter from "containers/PageFilter";
import PageHeader from "containers/PageHeader";
//shared
import Table from "shared/Table";
//api
import { deleteEmployee, getEmployees } from "api/employees";
//hooks
import { useDesignation } from "hooks/useDesignations";
import Loading from "shared/Loading";

export default function Employees() {
  const navigate = useNavigate();
  const [designations] = useDesignation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = (data) => {
    console.log(data);
  };

  const viewEmployeeDetail = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleDeleteEmployee = async (id) => {
    const {
      data: { status, data },
    } = await deleteEmployee(id);
    console.log({ status, data });
    fetchAllEmployees();
    if (status === "success") {
    }
  };

  const createEmployee = () => {
    navigate("/employees/new");
  };

  const pageBtn = {
    icon: PlusIcon,
    text: "New Employee",
    onClick: createEmployee,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search By ID",
      placeholder: "0001",
      ...register("id"),
    },
    {
      type: "text",
      label: "Search By Name",
      placeholder: "John Smith",
      ...register("name"),
    },
    {
      type: "select",
      label: "Choose Designation",
      items: designations,
      ...register("destination"),
    },
    {
      type: "submit",
      text: "Search",
    },
  ];

  const labels = [
    "Name",
    "Employee ID",
    "Department",
    "Designation",
    "Email",
    "Phone",
  ];

  const keys = [
    { name: "name" },
    { name: "id" },
    { name: "department" },
    { name: "designation" },
    { name: "email" },
    { name: "phone" },
  ];

  const actions = [
    {
      type: "button",
      icon: DotsVerticalIcon,
      color: "primary",
      onClick: (id) => viewEmployeeDetail(id),
    },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeleteEmployee(id),
    },
  ];

  const fetchAllEmployees = async () => {
    try {
      const {
        data: { status, data },
      } = await getEmployees();
      if (status === "success") {
        setEmployees(
          data.map(({ name, _id, designation, department, email, phone }) => ({
            name: name,
            id: _id,
            department: department.name,
            designation: designation.name,
            email,
            phone,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Employees" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table
          labels={labels}
          keys={keys}
          items={employees}
          actions={actions}
          text="Employees"
        />
      )}
    </div>
  );
}
