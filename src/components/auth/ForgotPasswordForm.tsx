"use client";

import { forgotPassword } from "@/actions/ForgotPasswordActions";
import { TForgotPasswordSchema, forgotPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";

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
      }
    } catch (e) {
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
              Enter the email associated with your account and we&apos;ll send
              you a link to reset your password
            </p>
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
              <div className="flex items-end justify-start gap-1">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
                <p className="-mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>
          <FormError message={error} />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            Continue
          </Button>
        </>
      ) : (
        <FormSuccess message={success} />
      )}
    </form>
  );
};

export default ForgotPasswordForm;
