"use client";

import { forgotPassword } from "@/actions/ForgotPasswordActions";
import { TForgotPasswordSchema, forgotPasswordSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import { Icons } from "../Icons";

const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    setError("");
    setSuccess("");

    try {
      const response = await forgotPassword(data);
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

  return !success ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-center gap-y-6"
    >
      <p className="text-sm text-zinc-700">
        Enter the email associated with your account and we&apos;ll send you a
        password reset link.
      </p>
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
      <FormError message={error} />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
        Send Password Reset Link
      </Button>
    </form>
  ) : (
    <div className="flex w-full flex-col items-start justify-center gap-y-6 text-sm">
      <p className="text-zinc-700">{success}</p>
      <Link
        href={"/sign-in"}
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
      >
        Return to Sign In
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
