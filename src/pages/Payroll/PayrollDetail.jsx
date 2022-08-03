import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
//containers
import PageHeader from "containers/PageHeader";
//shared
import Card from "shared/Card";
import Loading from "shared/Loading";
import { GrayText, SecondaryHeadingBold } from "shared/Typography";
//api
import { getPayroll } from "api/payrolls";
//utils
import { formatIntl } from "utils/formatNumber";

export default function PayrollDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [payrollDetail, setPayrollDetail] = useState();

  const backToPayroll = () => {
    navigate("/payroll");
  };

  const pageBtn = {
    icon: ArrowLeftIcon,
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

  if (id && !payrollDetail) return <Loading />;

  return (
    <div>
      <PageHeader pageTitle="Payroll Detail" pageBtn={pageBtn} />
      <Card>
        <Card.Content className="flex space-x-8">
          <div className="flex items-start gap-4">
            <div className="space-y-3 mr-8">
              <img
                src="/profile.jpg"
                className="h-28 w-28 rounded-full"
                alt="Profile"
              />
              <div className="text-center">
                <SecondaryHeadingBold className="mb-2">
                  {payrollDetail.employee.name}
                </SecondaryHeadingBold>
                <GrayText>Web Developer</GrayText>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex-1 max-w-2xl rounded-md p-4">
            <div className="grid gap-4">
              <div>
                <div className="grid grid-cols-2">
                  <GrayText>Month</GrayText>
                  <SecondaryHeadingBold>
                    {payrollDetail.month}
                  </SecondaryHeadingBold>
                </div>
              </div>

              <div>
                <SecondaryHeadingBold className="mb-2 underline">
                  Earnings
                </SecondaryHeadingBold>
                <div className="grid grid-cols-2 gap-2">
                  <GrayText>Basis Salary: </GrayText>
                  <GrayText>{formatIntl(payrollDetail.salary)} MMK</GrayText>
                  <GrayText>Overtimes</GrayText>
                  <GrayText>{payrollDetail.totalOvertimeAmount} MMK</GrayText>
                  <GrayText>Project Bonus</GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.projectBonus)} MMK
                  </GrayText>
                  <GrayText>Other Allowances</GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.otherAllowances)} MMK
                  </GrayText>
                </div>
              </div>

              <div>
                <SecondaryHeadingBold className="mb-2 underline">
                  Deductions
                </SecondaryHeadingBold>
                <div className="grid grid-cols-2 gap-2">
                  <GrayText>Tax: </GrayText>
                  <GrayText>0 MMK</GrayText>
                  <GrayText>Leaves</GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.totalLeaveAmount)} MMK
                  </GrayText>
                  <GrayText>Other Deductions</GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.otherDeductions)} MMK
                  </GrayText>
                </div>
              </div>

              <div>
                <SecondaryHeadingBold className="mb-2 underline">
                  Total
                </SecondaryHeadingBold>
                <div className="grid grid-cols-2 gap-2">
                  <GrayText>Total Gross Earnings: </GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.grossEarnings)} MMK
                  </GrayText>
                  <GrayText>Total Deductions: </GrayText>
                  <GrayText>
                    {formatIntl(payrollDetail.totalDeductions)} MMK
                  </GrayText>
                  <GrayText>Net Pay</GrayText>
                  <GrayText>{formatIntl(payrollDetail.netPay)} MMK</GrayText>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
