import { useEffect, useState } from "react";
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
//api
import { createPayroll, getPayroll, updatePayroll } from "api/payrolls";
//utils
import { formatMMMYYYY, formatMonth, formatYYYYMMDD } from "utils/formatDate";
//hooks
import { useEmployees } from "hooks/useEmployees";
import moment from "moment";

const schema = yup.object().shape({
  salary: yup.number().required("Salary is required"),
});

export default function NewPayrollForm() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [payrollDetail, setPayrollDetail] = useState();
  const [employees] = useEmployees();

  const backToPayroll = () => {
    navigate("/payroll");
  };

  const onSubmit = async (body) => {
    body.month = formatYYYYMMDD(body.month);
    const {
      data: { status },
    } = await (id ? updatePayroll(id, body) : createPayroll(body));
    if (status === "success") {
      navigate("/payroll");
    }
  };

  const cancel = () => {
    navigate("/payroll");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    color: "primary",
    text: "Payroll",
    onClick: backToPayroll,
    outline: true,
  };

  const fetchPayrollDetail = async () => {
    const {
      data: { status, data },
    } = await getPayroll(id);
    if (status === "success") {
      setPayrollDetail(data);
    }
  };

  useEffect(() => {
    id && fetchPayrollDetail();
  }, []);

  useEffect(() => {
    if (payrollDetail) {
      console.log({ payrollDetail });
      reset({
        employee: payrollDetail.employee._id,
        month: formatMonth(payrollDetail.month),
        salary: payrollDetail.salary,
        projectBonus: payrollDetail.projectBonus,
        otherAllowances: payrollDetail.otherAllowances,
        otherDeductions: payrollDetail.otherDeductions,
      });
    }
  }, [payrollDetail]);

  useEffect(() => {
    if (!id && employees.length) {
      reset({
        month: formatMonth(),
        employee: employees[0]._id,
        salary: employees[0].salaryAmount,
        projectBonus: 0,
        otherAllowances: 0,
        otherDeductions: 0,
      });
    }
  }, [employees]);

  if (id && !payrollDetail) return <Loading />;

  return (
    <div>
      <PageHeader
        pageTitle={id ? "Edit Payroll" : "Add Payroll"}
        pageBtn={pageBtn}
      />
      <Card>
        <Card.Title className="text-center mb-8">
          {id ? "Edit Payroll" : "Add Payroll"}
        </Card.Title>
        <Card.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <Input type="month" label="Month" {...register("month")} />
            <Select
              label="Choose Employee"
              items={employees}
              {...register("employee")}
            />
            <Input
              type="number"
              label="Basis salary"
              {...register("salary")}
              error={!!errors.salary}
              helpertext={errors?.salary?.message}
            />
            <Input
              type="number"
              label="Project Bonus"
              {...register("projectBonus")}
            />
            <Input
              type="number"
              label="Other Deductions"
              {...register("otherDeductions")}
            />
            <Input
              type="number"
              label="Other Allowances"
              {...register("otherAllowances")}
            />
            <div className="flex justify-center items-center gap-2 col-span-2 mt-4">
              <OutlinedButton type="button" text="Cancel" onClick={cancel} />
              <PrimaryButton type="submit" text="Save" />
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
