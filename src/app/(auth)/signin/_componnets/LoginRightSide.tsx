"use client";

import { loginAction } from "@/app/actions/auth";
import { useAuth } from "@/hooks/auth.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginRightSide = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await loginAction(data);

    if (res.status !== 200) {
      toast.error("Invalid Credentials! Please try again.", {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Login successful! Redirecting to home...", {
      position: "bottom-right",
      duration: 2000,
    });

    const accessToken = res.accessToken;
    const expiresAt = res.expiresAt;

    login(accessToken, expiresAt);


    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="w-full lgl:w-1/2 h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
      >
        <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
            Sign in
          </h1>

          <div className="flex flex-col gap-3">
            {/* Email */}
            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Work Email
              </p>
              <input
                {...register("email")} // Register email input with React Hook Form
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="email"
                placeholder="john@workemail.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-0.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Password
              </p>
              <input
                {...register("password")} // Register password input with React Hook Form
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="password"
                placeholder="Create password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
            >
              Sign In
            </button>
            <p className="text-sm text-center font-titleFont font-medium">
              Don&apos;t have an Account?{" "}
              <Link href="/signup">
                <span className="hover:text-blue-600 duration-300">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginRightSide;

