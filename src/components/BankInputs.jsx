import { Input } from "shared/Form";

export default function BankInputs({ register }) {
  return (
    <div>
      <div>
        <h3 className="font-bold text-xl dark:text-secondary-100 text-center mb-4">
          Bank Account
        </h3>
        <div className="grid gap-2 mb-8">
          <Input
            type="text"
            label="Bank Name"
            placeholder=""
            {...register("bankName")}
          />
          <Input
            type="text"
            label="Account Number"
            placeholder=""
            {...register("bankAccountNumber")}
          />
        </div>
      </div>
    </div>
  );
}
