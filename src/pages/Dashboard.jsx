import { getMonthlyExpenses, getTotalExpenses } from "api/dashboard";
import { getNonTechnicalEmployees, getTechnicalEmployees } from "api/employees";
import EmployeeStat from "components/EmployeeStat";
import ExpenseStat from "components/ExpenseStat";
import { useDesignation } from "hooks/useDesignations";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "shared/Loading";
import { PrimaryHeading } from "shared/Typography";
import moment from "moment";
import BarChart from "components/BarChart";

export default function Dashboard() {
  const [technicalEmployees, setTechnicalEmployees] = useState([]);
  const [nonTechnicalEmployees, setNonTechnicalEmployees] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [designations] = useDesignation();
  console.log({
    technicalEmployees,
    nonTechnicalEmployees,
    totalExpenses,
    monthlyExpenses,
  });

  useEffect(() => {
    const fetchTechnicalEmployees = async () => {
      const {
        data: { status, data },
      } = await getTechnicalEmployees();
      if (status === "success") setTechnicalEmployees(data);
    };
    const fetchNonTechnicalEmployees = async () => {
      const {
        data: { status, data },
      } = await getNonTechnicalEmployees();
      if (status === "success") setNonTechnicalEmployees(data);
    };
    const fetchTotalExpenses = async () => {
      const {
        data: { status, data },
      } = await getTotalExpenses();
      if (status === "success") setTotalExpenses(data);
    };
    const fetchMonthlyExpenses = async () => {
      const {
        data: { status, data },
      } = await getMonthlyExpenses();
      if (status === "success") setMonthlyExpenses(data);
    };
    fetchTechnicalEmployees();
    fetchNonTechnicalEmployees();
    fetchTotalExpenses();
    fetchMonthlyExpenses();
  }, []);

  // useEffect(() => {
  //   if(designations.length){

  //   }
  // },[designations])

  if (!designations.length) return <Loading />;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="max-w-xl grid grid-cols-2 gap-x-4 gap-y-8">
            <div className="col-span-2">
              <BarChart
                netPays={[40, 50, 10, 90, 30, 50, 100, 60, 10, 44, 11, 20]}
              />
            </div>
            <EmployeeStat
              data={technicalEmployees}
              designations={designations}
              title="Technical Hiring"
            />
            <EmployeeStat
              data={nonTechnicalEmployees}
              designations={designations}
              title="Non Technical Hiring"
            />
          </div>
        </div>
        <div className="max-w-md space-y-3">
          <ExpenseStat data={totalExpenses} title="Total Expenses" />
          <ExpenseStat
            data={monthlyExpenses}
            title={`${moment().format("MMMM")} Expenses`}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
