import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//containers
import PageHeader from "containers/PageHeader";
//shared
import Card from "shared/Card";
import Loading from "shared/Loading";
import { Input, Select } from "shared/Form";
import { OutlinedButton, PrimaryButton } from "shared/Button";
//data
import { status as statuses } from "data/data";
//hooks
import { useEmployees } from "hooks/useEmployees";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
//api
import { createProject, getProject, updateProject } from "api/projects";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Project Title is required!")
    .min(6, "Project Title should be at least 6 chars!"),
  description: yup.string().required("Project Description is required!"),
});

export default function NewProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState();
  const [employees] = useEmployees();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "OnBlur",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const backToProjects = () => {
    navigate("/projects");
  };

  const onSubmit = async (body) => {
    const {
      data: { status },
    } = await (id ? updateProject(id, body) : createProject(body));
    if (status === "success") {
      navigate("/projects");
    }
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Projects",
    onClick: backToProjects,
    outline: true,
  };

  useEffect(() => {
    if (employees.length) {
      reset({
        startDate: formatYYYYMMDD(),
        endDate: formatYYYYMMDD(),
        deadline: formatYYYYMMDD(),
        projectManager: employees[0]._id,
        projectLeader: employees[0]._id,
        status: statuses[0].name,
      });
    }
  }, [employees]);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      const {
        data: { status, data },
      } = await getProject(id);
      if (status === "success") {
        setProjectDetail(data);
      }
    };
    id && fetchProjectDetail();
  }, []);

  useEffect(() => {
    if (projectDetail) {
      reset({
        title: projectDetail.title,
        client: projectDetail.client,
        startDate: formatYYYYMMDD(projectDetail.startDate),
        endDate: formatYYYYMMDD(projectDetail.endDate),
        deadline: formatYYYYMMDD(projectDetail.deadline),
        projectManager: projectDetail.projectManager._id,
        projectLeader: projectDetail.projectLeader._id,
        teams: projectDetail.teams.map((team) => team._id),
        status: projectDetail.status,
        description: projectDetail.description,
      });
    }
  }, [projectDetail]);

  if (id && !projectDetail) return <Loading />;

  return (
    <div>
      <PageHeader pageTitle="New Project" pageBtn={pageBtn} />
      <Card>
        <Card.Title className="text-center mb-8">
          {id ? "Edit Project" : "Add Project"}
        </Card.Title>
        <Card.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <Input
              type="text"
              label="Project Name"
              placeholder="elevate"
              {...register("title")}
              error={!!errors.title}
              helpertext={errors?.title?.message}
            />
            <Input
              type="text"
              label="Client"
              placeholder="Amazon"
              {...register("client")}
            />
            <Input type="date" label="Start Date" {...register("startDate")} />
            <Input type="date" label="End Date" {...register("endDate")} />
            <Input type="date" label="Deadline" {...register("deadline")} />
            <Select
              label="Project Manager"
              items={employees}
              {...register("projectManager")}
            />
            <Select
              label="Project Leader"
              items={employees}
              {...register("projectLeader")}
            />
            <Select
              label="Team Members"
              items={employees}
              {...register("teams")}
              multiple={true}
            />
            <Select
              label="Project Status"
              items={statuses}
              {...register("status")}
            />
            <Input
              type="textarea"
              label="Description"
              placeholder="lorem..."
              {...register("description")}
              error={!!errors.description}
              helpertext={errors?.description?.message}
              className="col-span-2"
            />
            <div className="flex items-center justify-center gap-2 mt-4 col-span-2">
              <OutlinedButton
                type="button"
                text="Cancel"
                onClick={backToProjects}
              />
              <PrimaryButton type="submit" text="Save" />
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
