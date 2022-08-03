import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "hooks/useTheme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "shared/Form";
import { CheckboxInput } from "shared/Form";
import { PrimaryButton } from "shared/Button";
import { useTranslation } from "react-i18next";
import { signIn } from "api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { service } from "config/service";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be validate format!")
    .required("Email is Required!"),
  password: yup
    .string()
    .min(4, "Password must be at least 6!")
    .required("Password is required!"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body) => {
    try {
      console.log({ body });
      const {
        data: { status, data },
      } = await signIn(body);
      //if login success, set token to localstorage, to user, set default service headers
      if (status === "success") {
        localStorage.setItem("token", data.token);
        dispatch(setUser(data));
        service.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={themeMode === "dark" ? "dark" : "light"}>
      <div className="min-h-screen bg-gray-50 dark:bg-secondary-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center uppercase text-3xl font-extrabold text-gray-900 dark:text-secondary-100">
            Sign in
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-secondary-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                placeholder="Password"
                {...register("password")}
                error={!!errors.password}
                helpertext={errors?.password?.message}
              />

              {/* <div className="flex items-center justify-between">
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
              </div> */}

              <div>
                <PrimaryButton widthFull text={t("login")} type="submit" />
                {/* <p className="text-sm text-center mt-1 dark:text-secondary-100">
                  You don't already have account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary-500 hover:border-b border-primary-500"
                  >
                    Signup
                  </Link>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
