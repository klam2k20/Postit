"use client";

import { forgotPassword } from "@/actions/ForgotPasswordActions";
import { TForgotPasswordSchema, forgotPasswordSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import SubmitBtn from "../ui/SubmitBtn";
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
      <SubmitBtn isSubmitting={isSubmitting}>
        Send Password Reset Link
      </SubmitBtn>
    </form>
  ) : (
    <FormSuccess message={success} />
  );
};

export default ForgotPasswordForm;
