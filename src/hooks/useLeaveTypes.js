import { useEffect, useState } from "react";
import { getLeaveTypes } from "api/leaveTypes";

export const useLeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  useEffect(() => {
    const fetchAllPaymentTypes = async () => {
      const {
        data: { status, data },
      } = await getLeaveTypes();
      if (status === "success") {
        setLeaveTypes(data);
      }
    };
    fetchAllPaymentTypes();
  }, []);
  return [leaveTypes];
};
