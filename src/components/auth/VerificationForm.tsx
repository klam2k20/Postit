"use client";

import { verifyToken } from "@/actions/VerificationActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/Button";
import FormError from "./FormError";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";

const VerificationForm: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!token) {
        setError(
          "Token is missing. Please check the verification email and try again.",
        );
        return;
      }

      const response = await verifyToken(token);
      console.log(response);
      if (response?.error) {
        setError(response?.error);
      } else if (response?.success) {
        setSuccess(response?.success);
      }
    } catch (e) {
      setError("Something went wrong on our end. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return !success ? (
    <form
      action={onSubmit}
      className="flex w-full flex-col items-start justify-center gap-y-6"
    >
      <p className="text-sm text-zinc-700">
        To verify your account, please click the button below.
      </p>

      <FormError message={error} />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Icons.loader className="mr-2 h-4 w-4 animate-spin" />}
        Verify
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

export default VerificationForm;
