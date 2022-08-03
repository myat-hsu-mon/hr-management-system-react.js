import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//containers
import PageHeader from "containers/PageHeader";
//shared
import Card from "shared/Card";
import { Input } from "shared/Form";
import { Select } from "shared/Form";
import Loading from "shared/Loading";
import { OutlinedButton, PrimaryButton } from "shared/Button";
//hooks
import { useDesignation } from "hooks/useDesignations";
import { useEmployees } from "hooks/useEmployees";
import { useDepartment } from "hooks/useDepartments";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
//api
import { createPromotion, getPromotion, updatePromotion } from "api/promotions";

const schema = yup.object().shape({
  salaryTo: yup.number().required("Promoted Salary is required"),
});

export default function NewPromotionForm() {
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
  });
  const [employees] = useEmployees();
  const [departments] = useDepartment();
  const [designations] = useDesignation();
  const [promotionDetail, setPromotionDetail] = useState();

  const backToPromotions = () => {
    navigate("/promotions");
  };

  const onSubmit = async (body) => {
    console.log("promotion body", body);
    const {
      data: { status },
    } = await (id ? updatePromotion(id, body) : createPromotion(body));
    if (status === "success") {
      navigate("/promotions");
    }
  };

  const cancel = () => {
    navigate("/promotions");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Promotions",
    onClick: backToPromotions,
    outline: true,
  };

  useEffect(() => {
    if (promotionDetail) {
      reset({
        employee: promotionDetail.employee._id,
        department: promotionDetail.department._id,
        promotedFrom: promotionDetail.promotedFrom._id,
        promotedTo: promotionDetail.promotedTo._id,
        salaryFrom: promotionDetail.salaryFrom,
        salaryTo: promotionDetail.salaryTo,
        date: formatYYYYMMDD(promotionDetail.date),
      });
    }
  }, [promotionDetail]);

  useEffect(() => {
    if (employees.length && designations.length) {
      reset({
        employee: employees[0]._id,
        department: employees[0].department._id,
        promotedFrom: employees[0].designation._id,
        promotedTo: employees[0].designation._id,
        salaryFrom: employees[0].salaryAmount,
        salaryTo: employees[0].salaryAmount,
        date: formatYYYYMMDD(),
      });
    }
  }, [employees, designations]);

  useEffect(() => {
    const fetchPromotionDetail = async () => {
      const {
        data: { status, data },
      } = await getPromotion(id);
      if (status === "success") {
        setPromotionDetail(data);
      }
    };
    id && fetchPromotionDetail();
  }, []);

  if (id && !promotionDetail) return <Loading />;

  return (
    <div>
      <PageHeader pageTitle="New Promotion" pageBtn={pageBtn} />
      <Card>
        <Card.Title className="text-center mb-8">
          {id ? "Edit Promotion" : "Add Promotion"}
        </Card.Title>
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
            label="Department"
            items={departments}
            {...register("department")}
            disabled={true}
          />
          <Select
            label="Promoted From"
            items={designations}
            {...register("promotedFrom")}
            disabled={true}
          />
          <Select
            label="Promoted To"
            items={designations}
            {...register("promotedTo")}
          />
          <Input
            type="number"
            label="Salary From"
            placeholder="Salary From"
            disabled={true}
            {...register("salaryFrom")}
          />
          <Input
            type="number"
            label="Salary To"
            placeholder="Salary To"
            {...register("salaryTo")}
            error={!!errors.salaryTo}
            helpertext={errors?.salaryTo?.message}
          />
          <Input
            type="date"
            label="Choose Promotion Date"
            {...register("date")}
          />
          <div className="col-span-2 flex justify-center items-center gap-4 mt-4">
            <OutlinedButton text="Cancel" onClick={cancel} />
            <PrimaryButton type="submit" text="Save" />
          </div>
        </form>
      </Card>
    </div>
  );
}
