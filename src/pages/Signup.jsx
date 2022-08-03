import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTheme } from "hooks/useTheme";
import { PrimaryButton } from "shared/Button";
import { CheckboxInput, Input } from "shared/Form";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have validate format!")
    .required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be at least 6!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .min(6, "Confirm Password must be at least 6"),
});

export default function Signup() {
  const { themeMode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      console.log({ data });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={themeMode === "dark" ? "dark" : "light"}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="email"
                label="Email Address *"
                placeholder="Email"
                {...register("email")}
                error={!!errors.email}
                helpertext={errors?.email?.message}
              />
              <Input
                type="password"
                label="Password *"
                placeholder="******"
                {...register("password")}
                error={!!errors.password}
                helpertext={errors?.password?.message}
              />
              <Input
                type="password"
                label="Confirm Password *"
                placeholder="******"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helpertext={errors?.confirmPassword?.message}
              />

              <div className="flex items-center justify-between">
                <CheckboxInput
                  label="Remember me"
                  {...register("isRememberMe")}
                />

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <PrimaryButton type="submit" text="SignIn" widthFull />
                <p className="text-sm text-center mt-1 dark:text-gray-200">
                  You have already account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-500 hover:border-b border-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
