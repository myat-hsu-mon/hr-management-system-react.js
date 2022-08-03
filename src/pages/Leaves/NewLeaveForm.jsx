import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeftIcon } from "@heroicons/react/solid";
//containers
import PageHeader from "containers/PageHeader";
//shared
import Card from "shared/Card";
import Loading from "shared/Loading";
import { Select, Input } from "shared/Form";
import { OutlinedButton, PrimaryButton } from "shared/Button";
//hooks
import { useEmployees } from "hooks/useEmployees";
import { useLeaveTypes } from "hooks/useLeaveTypes";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
//api
import { createLeave, getLeave, updateLeave } from "api/leaves";

const schema = yup.object().shape({
  leaveReason: yup.string().required("Leave Reason is required!"),
});

export default function NewLeaveForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [leaveTypes] = useLeaveTypes();
  const [employees] = useEmployees();
  const [leaveDetail, setLeaveDetail] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const backToLeaves = () => {
    navigate("/leaves");
  };

  const onSubmit = async (body) => {
    const {
      data: { status },
    } = await (id ? updateLeave(id, body) : createLeave(body));
    if (status === "success") {
      navigate("/leaves");
    }
  };

  const cancel = () => {
    navigate("/leaves");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Leaves",
    onClick: backToLeaves,
    outline: true,
    color: "primary",
  };

  useEffect(() => {
    const fetchLeaveDetail = async () => {
      const {
        data: { status, data },
      } = await getLeave(id);
      if (status === "success") {
        setLeaveDetail(data);
      }
    };
    id && fetchLeaveDetail();
  }, []);

  useEffect(() => {
    if (leaveDetail) {
      reset({
        employee: leaveDetail.employee._id,
        leaveType: leaveDetail.leaveType._id,
        startDate: formatYYYYMMDD(leaveDetail.startDate),
        endDate: formatYYYYMMDD(leaveDetail.endDate),
        leaveReason: leaveDetail.leaveReason,
      });
    }
  }, [leaveDetail]);

  useEffect(() => {
    if (employees.length && leaveTypes.length) {
      reset({
        employee: employees[0]._id,
        leaveType: leaveTypes[0]._id,
        startDate: formatYYYYMMDD(),
        endDate: formatYYYYMMDD(),
      });
    }
  }, [employees, leaveTypes]);

  if (id && !leaveDetail) return <Loading />;
  return (
    <div>
      <PageHeader pageTitle="New Leave" pageBtn={pageBtn} />
      <Card>
        <Card.Title className="text-center mb-8">
          {id ? "Edit Leave" : "Add Leave"}
        </Card.Title>
        <Card.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <Select
              label="Choose Employee"
              items={employees}
              {...register("employee")}
            />
            <Select
              label="Choose Leave Type"
              items={leaveTypes}
              {...register("leaveType")}
            />
            <Input type="date" label="Start Date" {...register("startDate")} />
            <Input type="date" label="End Date" {...register("endDate")} />
            <Input
              type="textarea"
              label="Leave Reason"
              placeholder="lorem..."
              {...register("leaveReason")}
              error={!!errors.leaveReason}
              helpertext={errors?.leaveReason?.message}
            />
            <div className="col-span-2 flex justify-center gap-2 mt-4">
              <OutlinedButton type="button" text="Cancel" onClick={cancel} />
              <PrimaryButton type="submit" text="Save" />
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
