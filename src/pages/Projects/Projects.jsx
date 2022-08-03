import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PlusSmIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
//containers
import PageFilter from "containers/PageFilter";
import PageHeader from "containers/PageHeader";
//components
import Avatar from "components/Avatar";
//shared
import Table from "shared/Table";
//data
import { status } from "data/data";
//api
import { deleteProject, getProjects } from "api/projects";
//utils
import { formatDDMMYYYY } from "utils/formatDate";

export default function Projects() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const createProject = () => {
    navigate("/projects/new");
  };

  const editProject = (id) => {
    navigate(`/projects/${id}/edit`);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDeleteProject = async (id) => {
    const { status } = await deleteProject(id);
    if (status === 204) fetchAllProjects();
  };

  const pageBtn = {
    icon: PlusSmIcon,
    text: "New Project",
    onClick: createProject,
  };

  const pageFilters = [
    {
      type: "text",
      label: "Search by Project Name",
      placeholder: "Elevate",
      ...register("project"),
    },
    {
      type: "text",
      label: "Search by Employee",
      placeholder: "Luke",
      ...register("employee"),
    },
    { type: "select", label: "Status", items: status, ...register("status") },
    { type: "submit", text: "Search" },
  ];

  const labels = [
    "Project Name",
    "Client",
    "Project Manager",
    "Project Leader",
    "Team Members",
    "Deadline",
    "Start Date",
    "End Date",
    "Status",
  ];

  const keys = [
    { name: "title" },
    { name: "client" },
    { name: "projectManager" },
    { name: "projectLeader" },
    {
      name: "teams",
      render: (teams) => (
        <div className="flex flex-wrap">
          {teams.map((team, index) => (
            <Avatar {...team} key={index} />
          ))}
        </div>
      ),
    },
    { name: "deadline" },
    { name: "startDate" },
    { name: "endDate" },
    { name: "status" },
  ];

  const actions = [
    {
      type: "button",
      icon: PencilAltIcon,
      color: "primary",
      onClick: (id) => editProject(id),
    },
    {
      type: "button",
      icon: TrashIcon,
      color: "primary",
      onClick: (id) => handleDeleteProject(id),
    },
  ];

  const fetchAllProjects = async () => {
    try {
      const {
        data: { status, data },
      } = await getProjects();
      if (status === "success") {
        setProjects(
          data.map((project) => ({
            id: project._id,
            title: project.title,
            client: project.client,
            projectManager: project.projectManager?.name,
            projectLeader: project.projectLeader?.name,
            teams: project.teams,
            deadline: formatDDMMYYYY(project.deadline),
            startDate: formatDDMMYYYY(project.startDate),
            endDate: formatDDMMYYYY(project.endDate),
            status: project.status,
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
    fetchAllProjects();
  }, []);

  return (
    <div>
      <PageHeader pageTitle="Projects" pageBtn={pageBtn} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageFilter filters={pageFilters} />
      </form>
      {!loading && (
        <Table
          labels={labels}
          keys={keys}
          items={projects}
          actions={actions}
          text="Projects"
        />
      )}
    </div>
  );
}
