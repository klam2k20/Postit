"use client";

import { signIn } from "@/actions/SignInActions";
import { TSignInSchema, signInSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle } from "react-icons/fi";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";
import SocialLogins from "./SocialLogins";

//todo: loading animation for login buttons
const SignInForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    setError("");
    setSuccess("");

    try {
      const response = await signIn(data);
      if (response?.error) {
        setError(response?.error);
      } else if (response?.success) {
        setSuccess(response?.success);
        reset();
      }
    } catch (e) {
      setError("Something went wrong on our end. Please try again later.");
    }
  };

  return (
    <div className="flex w-[400px] flex-col items-start justify-center gap-y-4 px-6 sm:px-8 sm:py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center gap-y-8"
      >
        <div className="flex flex-col items-start gap-y-2">
          <h1 className="text-2xl font-semibold leading-none">Welcome Back!</h1>
          <p className="text-sm text-zinc-700">
            Don&apos;t have an account?{" "}
            <Link
              href={"/sign-up"}
              className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
            >
              Sign up.
            </Link>
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-y-4">
          <div className="flex w-full flex-col gap-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="johndoe@email.com"
              disabled={isSubmitting}
              className="border-zinc-900"
            />
            {errors.email && (
              <div className="flex items-end justify-start gap-1">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
                <p className="-mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="******"
              disabled={isSubmitting}
              className="border-zinc-900"
            />
            {errors.password && (
              <div className="flex items-end justify-start gap-1">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
                <p className="-mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>

          <Link
            href={"/forgot-password"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "-mt-2 h-fit items-end self-end p-0 text-sm",
            )}
          >
            Forgot Password
          </Link>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign In
        </Button>
      </form>
      <SocialLogins isSubmitting={isSubmitting} />
    </div>
  );
};

export default SignInForm;
