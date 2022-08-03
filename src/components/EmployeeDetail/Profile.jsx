import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { PencilAltIcon } from "@heroicons/react/solid";
//shared
import Card from "shared/Card";
import Dialog from "shared/Dialog";
import Loading from "shared/Loading";
import { OutlinedButton, PrimaryButton } from "shared/Button";
//pages
import { schema } from "pages/Employees/NewEmployeeForm";
//components
import BankInputs from "components/BankInputs";
import SalaryInputs from "components/SalaryInputs";
import ProfileInputs from "components/ProfileInputs";
import ContactInputs from "components/ContactInputs";
import InformationItem from "components/InformationItem";
import EducationInputs from "components/EducationInputs";
import EmploymentInputs from "components/EmploymentInputs";
//api
import { updateEmployee } from "api/employees";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
//hooks
import { useDepartment } from "hooks/useDepartments";
import { useDesignation } from "hooks/useDesignations";
import { usePaymentTypes } from "hooks/usePaymentTypes";
import { useEmploymentTypes } from "hooks/useEmploymentTypes";

export default function Profile({ employee }) {
  const navigate = useNavigate();
  const [departments] = useDepartment();
  const [designations] = useDesignation();
  const [employmentTypes] = useEmploymentTypes();
  const [paymentTypes] = usePaymentTypes();

  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(0);

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

  const {
    id,
    name,
    username,
    department,
    joiningDate,
    employmentType,
    salaryAmount,
    designation,
    email,
    phone,
    company,
    paymentType,
    contactName,
    contactRelation,
    contactPhone,
    bankName,
    bankAccountNumber,
    institudeName,
    degree,
    institudeStartingYear,
    institudeEndingYear,
  } = employee;

  useEffect(() => {
    if (employee) {
      reset({
        ...employee,
        joiningDate: formatYYYYMMDD(employee.joiningDate),
        institudeEndingYear: formatYYYYMMDD(employee.institudeEndingYear),
        institudeStartingYear: formatYYYYMMDD(employee.institudeStartingYear),
      });
    }
  }, [employee]);

  const openDialog = (index) => {
    setOpenId(index);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const onSubmit = async (body) => {
    closeDialog();
    // console.log("body: ", body);
    // console.log({ openId });
    let editBody = {};
    switch (openId) {
      case 0: {
        editBody = {
          name: body.name,
          username: body.username,
          email: body.email,
          phone: body.phone,
          company: body.company,
          department: body.department,
          designation: body.designation,
          joiningDate: formatYYYYMMDD(body.joiningDate),
        };
        break;
      }
      case 1: {
        editBody = {
          employmentType: body.employmentType,
        };
        break;
      }
      case 2: {
        editBody = {
          salaryAmount: body.salaryAmount,
          paymentType: body.paymentType,
        };
        break;
      }
      case 3: {
        editBody = {
          contactName: body.contactName,
          contactRelation: body.contactRelation,
          contactPhone: body.contactPhone,
        };
        break;
      }
      case 4: {
        editBody = {
          bankName: body.bankName,
          bankAccountNumber: body.bankAccountNumber,
        };
        break;
      }
      case 5: {
        editBody = {
          institudeName: body.institudeName,
          degree: body.degree,
          institudeStartingYear: formatYYYYMMDD(body.institudeStartingYear),
          institudeEndingYear: formatYYYYMMDD(body.institudeEndingYear),
        };
        break;
      }
      default:
        break;
    }
    console.log({ editBody });
    const {
      data: { status },
    } = await updateEmployee(id, editBody);
    if (status === "success") {
      navigate(`/employees`);
    }
  };

  const employmentItems = [
    {
      name: "Employment Type :",
      value: employmentTypes.find(
        (employment) => employment._id === employmentType
      )?.name,
    },
  ];

  const profileItems = [
    { name: "Name", value: name },
    { name: "Username", value: username },
    { name: "Email", value: email },
    { name: "Phone Number", value: phone },
    {
      name: "Department",
      value: departments.find((dept) => dept._id === department)?.name,
    },
    {
      name: "Designation",
      value: designations.find((design) => design._id === designation)?.name,
    },
    { name: "Company", value: company },
    { name: "Joining Date", value: joiningDate },
  ];

  const educationItems = [
    { name: "Institude Name", value: institudeName },
    { name: "Degree", value: degree },
    { name: "Starting Year", value: institudeStartingYear },
    { name: "Ending Year", value: institudeEndingYear },
  ];

  const salaryItems = [
    { name: "Salary Amount", value: salaryAmount },
    {
      name: "Payment Method",
      value: paymentTypes.find((payment) => payment._id === paymentType)?.name,
    },
  ];

  const contactItems = [
    { name: "Name", value: contactName },
    { name: "Relation", value: contactRelation },
    { name: "Phone", value: contactPhone },
  ];

  const bankItems = [
    { name: "Bank Name", value: bankName },
    { name: "Account Number", value: bankAccountNumber },
  ];

  const cards = [
    { title: "Profile Information", items: profileItems },
    { title: "Employment Information", items: employmentItems },
    { title: "Salary Information", items: salaryItems },
    { title: "Emergency Contact", items: contactItems },
    { title: "Bank Account", items: bankItems },
    { title: "Education", items: educationItems },
  ];

  const getInputContent = (id) => {
    switch (id) {
      case 0:
        return (
          <ProfileInputs
            register={register}
            errors={errors}
            departments={departments}
            designations={designations}
          />
        );
      case 1:
        return (
          <EmploymentInputs
            register={register}
            errors={errors}
            employmentTypes={employmentTypes}
          />
        );
      case 2:
        return (
          <SalaryInputs
            register={register}
            errors={errors}
            paymentTypes={paymentTypes}
          />
        );
      case 3:
        return (
          <ContactInputs register={register} errors={errors} reset={reset} />
        );
      case 4:
        return <BankInputs register={register} errors={errors} reset={reset} />;
      case 5:
        return (
          <EducationInputs register={register} errors={errors} reset={reset} />
        );

      default:
        break;
    }
  };

  if (
    !departments.length &&
    !designations.length &&
    !employmentTypes.length &&
    !paymentTypes.length
  )
    return <Loading />;

  return (
    <div>
      {cards.map(({ title, items }, index) => (
        <Card className="my-4" key={title}>
          <Card.Header>
            <div className="flex justify-between items-center">
              <Card.Title>{title}</Card.Title>
              <PrimaryButton
                icon={PencilAltIcon}
                text="Edit"
                color="gray"
                onClick={() => openDialog(index)}
              />
            </div>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {items.map((item) => (
                <InformationItem {...item} key={item.name} />
              ))}
            </div>
          </Card.Content>
        </Card>
      ))}
      <Dialog open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {getInputContent(openId)}
          <div className="flex justify-center items-center gap-2">
            <OutlinedButton text="Cancel" onClick={closeDialog} />
            <PrimaryButton text="Save" type="submit" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
