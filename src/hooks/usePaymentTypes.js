import { useEffect, useState } from "react";
import { getPaymentTypes } from "api/paymentTypes";

export const usePaymentTypes = () => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  useEffect(() => {
    const fetchAllPaymentTypes = async () => {
      const {
        data: { status, data },
      } = await getPaymentTypes();
      if (status === "success") {
        setPaymentTypes(data);
      }
    };
    fetchAllPaymentTypes();
  }, []);
  return [paymentTypes];
};
