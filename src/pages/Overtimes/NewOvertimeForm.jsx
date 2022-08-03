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
import { PrimaryButton, OutlinedButton } from "shared/Button";
//hooks
import { useEmployees } from "hooks/useEmployees";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
//api
import { createOvertime, getOvertime, updateOvertime } from "api/overtimes";

const schema = yup.object().shape({
  reason: yup.string().required("Reason is required!"),
});

export default function NewOvertimeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employees] = useEmployees();
  const [overtimeDetail, setOvertimeDetail] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const backToOvertimes = () => {
    navigate("/leaves");
  };

  const onSubmit = async (body) => {
    const {
      data: { status },
    } = await (id ? updateOvertime(id, body) : createOvertime(body));
    if (status === "success") {
      navigate("/overtimes");
    }
  };

  const cancel = () => {
    navigate("/overtimes");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Overtimes",
    onClick: backToOvertimes,
    outline: true,
    color: "primary",
  };

  useEffect(() => {
    const fetchOvertimeDetail = async () => {
      const {
        data: { status, data },
      } = await getOvertime(id);
      if (status === "success") {
        setOvertimeDetail(data);
      }
    };
    id && fetchOvertimeDetail();
  }, []);

  useEffect(() => {
    if (overtimeDetail) {
      reset({
        employee: overtimeDetail.employee._id,
        startDate: formatYYYYMMDD(overtimeDetail.startDate),
        endDate: formatYYYYMMDD(overtimeDetail.endDate),
        reason: overtimeDetail.reason,
      });
    }
  }, [overtimeDetail]);

  useEffect(() => {
    if (employees.length) {
      reset({
        employee: employees[0]._id,
        startDate: formatYYYYMMDD(),
        endDate: formatYYYYMMDD(),
      });
    }
  }, [employees]);

  if (id && !overtimeDetail) return <Loading />;

  return (
    <div>
      <PageHeader pageTitle="New Overtime" pageBtn={pageBtn} />
      <Card>
        <Card.Title className="text-center mb-8">
          {id ? "Edit Overtime" : "Add Overtime"}
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
            <Input type="date" label="Start Date" {...register("startDate")} />
            <Input type="date" label="End Date" {...register("endDate")} />
            <Input
              type="textarea"
              label="Reason"
              placeholder=""
              {...register("reason")}
              error={!!errors.reason}
              helpertext={errors?.reason?.message}
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
