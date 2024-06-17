"use client";

import { resetPassword } from "@/actions/ResetPasswordActions";
import { TResetPasswordSchema, resetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./PasswordInput";
import { Icons } from "../Icons";

//todo: go through all the forms and add back buttons
const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParamas = useSearchParams();
  const token = searchParamas.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token is missing");
      return;
    }

    try {
      const response = await resetPassword(data, token);
      if (response?.error) {
        setError(response?.error);
      } else if (response?.success) {
        setSuccess(response?.success);
        reset();
      }
    } catch (e) {
      console.log(e);
      setError("Something went wrong on our end. Please try again later.");
    }
  };

  return !success ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-center gap-y-6"
    >
      <p className="text-sm text-zinc-700">
        Make sure it&apos;s 6-50 characters long, contains at least one
        uppercase letter, and one special character.
      </p>

      <div className="flex w-full flex-col items-start gap-y-4">
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
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
        Reset Password
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

export default ResetPasswordForm;
