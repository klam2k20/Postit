import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Fragment } from "react";

const SignInForm: React.FC = () => {
  return (
    <div className="flex w-[400px] flex-col items-start justify-center gap-y-8 px-6 sm:px-8 sm:py-6">
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
            type="email"
            id="email"
            placeholder="email"
            className="border-zinc-900"
          />
        </div>

        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            className="border-zinc-900"
          />
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

      <div className="just-center flex w-full flex-col items-center gap-y-4">
        <Button className="w-full">Sign In</Button>{" "}
        <Button variant={"outline"} className="w-full border-zinc-900">
          Sign in with Google
        </Button>
        <Button variant={"outline"} className="w-full border-zinc-900">
          Sign in with Github
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
