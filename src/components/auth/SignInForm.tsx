"use client";

import { signIn } from "@/actions/SignInActions";
import { TSignInSchema, signInSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../Icons";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";
import FormError from "./FormError";
import { PasswordInput } from "./PasswordInput";
import SocialLogins from "./SocialLogins";

const SignInForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    setError("");

    try {
      const response = await signIn(data);
      if (response?.error) {
        setError(response?.error);
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
          Don&apos;t have an account?{" "}
          <Link
            href={"/sign-up"}
            className={cn(buttonVariants({ variant: "link" }), "h-fit p-0")}
          >
            Sign up.
          </Link>
        </p>

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
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex w-full flex-col gap-y-2">
            <div className="flex w-full items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <Link
                href={"/forgot-password"}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-fit p-0 text-sm",
                )}
              >
                Forgot Password?
              </Link>
            </div>
            <PasswordInput {...register("password")} disabled={isSubmitting} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>

        <FormError message={error} />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && (
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
      <SocialLogins isSubmitting={isSubmitting} />
    </>
  );
};

export default SignInForm;
