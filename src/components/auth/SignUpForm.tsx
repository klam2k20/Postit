"use client";

import { signUp } from "@/actions/SignUpActions";
import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";
import SocialLogins from "./SocialLogins";
import { PasswordInput } from "./PasswordInput";
import { Icons } from "../Icons";

const SignUpForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    setError("");
    setSuccess("");

    try {
      const response = await signUp(data);
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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start justify-center gap-y-6"
      >
        <p className="text-sm text-zinc-700">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
          >
            Sign in.
          </Link>
        </p>

        <div className="flex w-full flex-col items-start gap-y-4">
          <div className="flex w-full flex-col gap-y-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <Input
              {...register("name")}
              id="name"
              placeholder="John Doe"
              disabled={isSubmitting}
              className="border-zinc-900"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <PasswordInput {...register("password")} disabled={isSubmitting} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <PasswordInput
              {...register("confirmPassword")}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && (
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>
      </form>
      <SocialLogins isSubmitting={isSubmitting} />
    </>
  );
};

export default SignUpForm;
