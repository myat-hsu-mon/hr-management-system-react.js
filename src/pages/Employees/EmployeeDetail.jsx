import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreditCardIcon,
  OfficeBuildingIcon,
  UserIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  ScissorsIcon,
} from "@heroicons/react/solid";
//containers
import PageHeader from "containers/PageHeader";
//shared
import Tabs from "shared/Tabs";
import Loading from "shared/Loading";
import { GrayText, SecondaryHeadingBold, Text } from "shared/Typography";
//api
import { getEmployee } from "api/employees";
//components
import Leaves from "components/EmployeeDetail/Leaves";
import Payroll from "components/EmployeeDetail/Payroll";
import Profile from "components/EmployeeDetail/Profile";
import InformationItem from "components/InformationItem";
import Projects from "components/EmployeeDetail/Projects";
import Overtimes from "components/EmployeeDetail/Overtimes";
//utils
import { formatYYYYMMDD } from "utils/formatDate";
import { useDesignation } from "hooks/useDesignations";

const tabs = [
  { id: 0, name: "Profile", icon: UserIcon },
  { id: 1, name: "Projects", icon: UserGroupIcon },
  { id: 2, name: "Payroll", icon: OfficeBuildingIcon },
  { id: 3, name: "Overtimes", icon: CreditCardIcon },
  { id: 4, name: "Leaves", icon: ScissorsIcon },
];

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [employee, setEmployee] = useState();
  const [designations] = useDesignation();

  const backToEmployees = () => {
    navigate("/employees");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
    text: "Employees",
    onClick: backToEmployees,
    outline: true,
  };

  const getTabContent = (id) => {
    switch (id) {
      case 0:
        return <Profile employee={employee} />;
      case 1:
        return <Projects projects={employee.projects || []} />;
      case 2:
        return <Payroll payroll={employee.payrolls || []} />;
      case 3:
        return <Overtimes overtimes={employee.overtimes || []} />;
      case 4:
        return <Leaves leaves={employee.leaves || []} />;
      default:
        break;
    }
  };
  console.log({ employee });
  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      const {
        data: { status, data },
      } = await getEmployee(id);
      console.log("response: ", data);
      if (status === "success") {
        setEmployee({
          ...data,
          id: data._id,
          joiningDate: formatYYYYMMDD(data.joiningDate),
          department: data.department._id,
          employmentType: data.employmentType._id,
          designation: data.designation._id,
          paymentType: data.paymentType._id,
          institudeStartingYear: formatYYYYMMDD(data.institudeStartingYear),
          institudeEndingYear: formatYYYYMMDD(data.institudeEndingYear),
        });
      }
    };
    fetchEmployeeDetail();
  }, []);

  if (!employee) return <Loading />;

  return (
    <div>
      <PageHeader pageTitle="Team Members" pageBtn={pageBtn} />
      <div className="bg-white dark:bg-secondary-400 shadow rounded-md">
        <div className="sm:border-b border-gray-200 py-8 px-6">
          <SecondaryHeadingBold className="mb-8">
            Standard Information
          </SecondaryHeadingBold>
          <div className="flex">
            <div className="flex-1 flex items-center gap-4">
              <div>
                <img
                  src="/profile.jpg"
                  alt="logo"
                  className="h-32 w-32 rounded-full object-cover object-center"
                />
              </div>
              <div>
                <SecondaryHeadingBold className="mb-2">
                  {employee.name}
                </SecondaryHeadingBold>
                <GrayText className="mb-8">
                  {
                    designations.find(
                      (designation) => designation._id === employee.designation
                    )?.name
                  }
                </GrayText>
                <Text>Employee ID: &nbsp;{employee.id}</Text>
                <GrayText>Join Date: &nbsp;{employee.joiningDate}</GrayText>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-full grid gap-2 content-between">
                <InformationItem name="Email:" value={employee.email} />
                <InformationItem name="Phone:" value={employee.phone} />
                <InformationItem name="Company:" value={employee.company} />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pl-6">
          <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </div>
      <div className="">
        {tabs.map((tab) => (
          <div key={tab.id}>
            {tab.id === currentTab && getTabContent(tab.id)}
          </div>
        ))}
      </div>
    </div>
  );
}
