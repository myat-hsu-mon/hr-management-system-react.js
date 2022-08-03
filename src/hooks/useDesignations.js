import { useEffect, useState } from "react";
import { getDesignations } from "api/designations";

export const useDesignation = () => {
  const [designations, setDesignations] = useState([]);
  useEffect(() => {
    const fetchAllDesignations = async () => {
      const {
        data: { status, data },
      } = await getDesignations();
      if (status === "success") {
        setDesignations(data);
      }
    };
    fetchAllDesignations();
  }, []);
  return [designations];
};
