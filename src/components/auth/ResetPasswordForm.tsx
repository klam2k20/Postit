"use client";

import { resetPassword } from "@/actions/ResetPasswordActions";
import { TResetPasswordSchema, resetPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";

//todo: go through all the forms and add back buttons
const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParamas = useSearchParams();
  const token = searchParamas.get("token");

  const {
    register,
    handleSubmit,
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
      }
    } catch (e) {
      console.log(e);
      setError("Something went wrong on our end. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[400px] flex-col items-start justify-center gap-y-4"
    >
      {!success ? (
        <>
          <div className="mb-4 flex flex-col items-start gap-y-2">
            <p className="text-sm text-zinc-700">
              Password must be 6-50 characters long, contain at least one
              uppercase letter, and one special character
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-y-4">
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
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Reset Password
          </Button>
        </>
      ) : (
        <FormSuccess message={success} />
      )}
    </form>
  );
};

export default ResetPasswordForm;