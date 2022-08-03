import { useEffect } from "react";
//shared
import { Select, Input } from "shared/Form";

export default function ProfileInputs({
  register,
  errors,
  departments,
  designations,
}) {
  return (
    <div>
      <h3 className="font-bold text-lg dark:text-secondary-100 text-center mb-4">
        Profile Information
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-8">
        <Input
          type="text"
          label="Full Name"
          placeholder="John Smith"
          {...register("name")}
          error={!!errors.name}
          helpertext={errors?.name?.message}
        />
        <Input
          type="text"
          label="Username"
          placeholder="@john"
          {...register("username")}
          error={!!errors.username}
          helpertext={errors?.username?.message}
        />
        <Input
          type="email"
          label="Email"
          placeholder="johnsmith@gmail.com"
          {...register("email")}
          error={!!errors.email}
          helpertext={errors?.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="******"
          {...register("password")}
          error={!!errors.password}
          helpertext={errors?.password?.message}
        />
        <Input
          type="text"
          label="Phone number"
          placeholder="+95997438483"
          {...register("phone")}
          error={!!errors.phone}
          helpertext={errors?.phone?.message}
        />
        <Input
          type="text"
          label="Company"
          placeholder="Google"
          {...register("company")}
        />
        <Select
          label="Department"
          items={departments}
          {...register("department")}
        />
        <Select
          label="Designation"
          items={designations}
          {...register("designation")}
        />
        <Input type="date" label="Joining Date" {...register("joiningDate")} />
      </div>
    </div>
  );
}
