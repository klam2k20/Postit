"use client";

import { verifyToken } from "@/actions/VerificationActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/Button";
import FormError from "./FormError";
import FormSuccess from "./FormSucess";

const VerificationForm: React.FC = (props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const onSubmit = async () => {
    try {
      if (!token) {
        setError(
          "Token is missing. Please check the verification email and try again.",
        );
        return;
      }

      const response = await verifyToken(token);
      if (response?.error) {
        setError(response?.error);
      } else if (response?.success) {
        setSuccess(response?.success);
        router.push("/");
      }
    } catch (e) {
      setError("Something went wrong on our end. Please try again later.");
    }
  };

  return (
    <form
      action={onSubmit}
      className="flex w-[400px] flex-col items-start justify-center gap-y-8"
    >
      <div className="flex flex-col items-start gap-y-2">
        <h1 className="text-2xl font-semibold leading-none">
          Account confirmation
        </h1>
        <p className="text-sm text-zinc-700">
          To confirm your account, please follow the button below.
        </p>
      </div>

      <FormError message={error} />
      <FormSuccess message={success} />
      <Button type="submit" className="w-full">
        Confirm account
      </Button>
    </form>
  );
};

export default VerificationForm;
