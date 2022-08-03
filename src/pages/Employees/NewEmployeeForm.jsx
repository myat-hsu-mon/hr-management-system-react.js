import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//containers
import PageHeader from "containers/PageHeader";
//shared
import { OutlinedButton, PrimaryButton } from "shared/Button";
import Stepper from "shared/Stepper";
//components
import ProfileInputs from "components/ProfileInputs";
import EmploymentInputs from "components/EmploymentInputs";
import SalaryInputs from "components/SalaryInputs";
import ContactInputs from "components/ContactInputs";
import BankInputs from "components/BankInputs";
import EducationInputs from "components/EducationInputs";
//api
import { createEmployee } from "api/employees";
import { formatYYYYMMDD } from "utils/formatDate";
import { useDepartment } from "hooks/useDepartments";
import { useDesignation } from "hooks/useDesignations";
import { usePaymentTypes } from "hooks/usePaymentTypes";
import { useEmploymentTypes } from "hooks/useEmploymentTypes";

const steps = [
  { id: 0, name: "Profile information" },
  { id: 1, name: "Employment information" },
  { id: 2, name: "Salary information" },
  { id: 3, name: "Emergency Contact" },
  { id: 4, name: "Bank Account" },
  { id: 5, name: "Education" },
];

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Employee Name is required")
    .min(4, "Employee name must be at least 4 chars"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  salaryAmount: yup.number().required("Salary Amount is required"),
  // password: yup.string().required("Password is required"),
});

export default function NewEmployeeForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolvers: yupResolver(schema),
    defaultValues: {},
  });
  const [departments] = useDepartment();
  const [designations] = useDesignation();
  const [employmentTypes] = useEmploymentTypes();
  const [paymentTypes] = usePaymentTypes();

  useEffect(() => {
    if (
      departments.length &&
      designations.length &&
      employmentTypes.length &&
      paymentTypes.length
    ) {
      reset({
        department: departments[0]._id,
        designation: designations[0]._id,
        employmentType: employmentTypes[0]._id,
        paymentType: paymentTypes[0]._id,
        joiningDate: formatYYYYMMDD(),
        institudeStartingYear: formatYYYYMMDD(),
        institudeEndingYear: formatYYYYMMDD(),
      });
    }
  }, [departments, designations, employmentTypes, paymentTypes]);

  const [activeStep, setActiveStep] = useState(0);

  const goToNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const backToPreviousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const backtoEmployees = () => {
    navigate("/employees");
  };

  const onSubmit = async (body) => {
    const {
      data: { status },
    } = await createEmployee(body);
    if (status === "success") {
      navigate("/employees");
    }
    console.log({ body });
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Employees",
    onClick: backtoEmployees,
    outline: true,
  };

  const getStepContent = (stepId) => {
    switch (stepId) {
      case 0:
        return (
          <div>
            <ProfileInputs
              register={register}
              errors={errors}
              departments={departments}
              designations={designations}
            />
            <div className="flex justify-end gap-2">
              <PrimaryButton text="Next" onClick={goToNextStep} />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <EmploymentInputs
              register={register}
              errors={errors}
              employmentTypes={employmentTypes}
            />
            <div className="flex justify-end gap-2">
              <OutlinedButton text="Prev" onClick={backToPreviousStep} />
              <PrimaryButton text="Next" onClick={goToNextStep} />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <SalaryInputs
              register={register}
              errors={errors}
              paymentTypes={paymentTypes}
            />
            <div className="flex justify-end gap-2">
              <OutlinedButton text="Prev" onClick={backToPreviousStep} />
              <PrimaryButton text="Next" onClick={goToNextStep} />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <ContactInputs register={register} errors={errors} />
            <div className="flex justify-end gap-2">
              <OutlinedButton text="Prev" onClick={backToPreviousStep} />
              <PrimaryButton text="Next" onClick={goToNextStep} />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <BankInputs register={register} errors={errors} />
            <div className="flex justify-end gap-2">
              <OutlinedButton text="Prev" onClick={backToPreviousStep} />
              <PrimaryButton text="Next" onClick={goToNextStep} />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <EducationInputs register={register} errors={errors} />
            <div className="flex justify-end gap-2">
              <OutlinedButton text="Prev" onClick={backToPreviousStep} />
              <PrimaryButton type="submit" text="Save" />
            </div>
          </div>
        );
      default:
        return "Unknown Step";
    }
  };

  if (
    !departments.length &&
    !designations.length &&
    !employmentTypes.length &&
    !paymentTypes.length
  )
    return null;

  return (
    <>
      <PageHeader pageTitle="New Employee" pageBtn={pageBtn} />
      <div className="flex gap-16">
        <Stepper steps={steps} activeStep={activeStep} />
        <div className="flex-1  bg-white dark:bg-secondary-400 shadow-sm rounded-md p-8">
          {steps.map((step) => (
            <form key={step.id} onSubmit={handleSubmit(onSubmit)}>
              {step.id === activeStep && getStepContent(step.id)}
            </form>
          ))}
        </div>
      </div>
    </>
  );
}
