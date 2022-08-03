import { useEffect } from "react";
//shared
import { Input, Select } from "shared/Form";

export default function SalaryInputs({ register, errors, paymentTypes }) {
  return (
    <div>
      <h3 className="font-bold text-xl dark:text-secondary-100 text-center mb-4">
        Salary Information
      </h3>
      <div className="grid gap-2 mb-8">
        <Input
          type="number"
          label="Salary Amount"
          placeholder="1,000"
          {...register("salaryAmount")}
          error={!!errors.salaryAmount}
          helpertext={errors?.salaryAmount?.message}
        />
        <Select
          label="Payment Type"
          items={paymentTypes}
          {...register("paymentType")}
        />
      </div>
    </div>
  );
}
