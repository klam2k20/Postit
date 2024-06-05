"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";

const signInSchema = z.object({
  email: z.string().trim().email({ message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type TSignInSchema = z.infer<typeof signInSchema>;

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[400px] flex-col items-start justify-center gap-y-8 px-6 sm:px-8 sm:py-6"
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
            placeholder="email"
            className="border-zinc-900"
          />
          {errors.email && (
            <div className="flex items-end justify-start gap-1">
              <CircleAlert className="h-5 w-5 text-red-500" />
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
            placeholder="password"
            className="border-zinc-900"
          />
          {errors.password && (
            <div className="flex items-end justify-start gap-1">
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="-mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            </div>
          )}
        </div>

        <Link
          href={"/sign-up"}
          className={cn(
            buttonVariants({ variant: "link" }),
            "-mt-2 h-fit items-end self-end p-0 text-sm",
          )}
        >
          Forgot Password
        </Link>
      </div>

      <div className="flex w-full flex-col items-center gap-y-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign In
        </Button>
        <Button variant={"outline"} className="w-full border-zinc-900">
          Sign in with Google
        </Button>
        <Button variant={"outline"} className="w-full border-zinc-900">
          Sign in with Github
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
