"use client";

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

//TODO: Show password
//TODO: Add Google and GitHub icons to sign in options
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
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[400px] flex-col items-start justify-center gap-y-8 px-6 sm:px-8 sm:py-6"
    >
      <div className="flex flex-col items-start gap-y-2">
        <h1 className="text-2xl font-semibold leading-none">
          Create an Account
        </h1>
        <p className="text-sm text-zinc-700">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
          >
            Sign in.
          </Link>
        </p>
      </div>

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
            <p className="-mt-2 text-sm text-red-500">{errors.name.message}</p>
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
            <p className="-mt-2 text-sm text-red-500">{errors.email.message}</p>
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
            <p className="-mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <Input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="******"
            disabled={isSubmitting}
            className="border-zinc-900"
          />
          {errors.confirmPassword && (
            <p className="-mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <FormError message={error} />
      <FormSuccess message={success} />

      <div className="flex w-full flex-col items-center gap-y-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign Up
        </Button>
        <Button
          variant={"outline"}
          disabled={isSubmitting}
          className="w-full border-zinc-900"
        >
          Sign up with Google
        </Button>
        <Button
          variant={"outline"}
          disabled={isSubmitting}
          className="w-full border-zinc-900"
        >
          Sign up with GitHub
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;