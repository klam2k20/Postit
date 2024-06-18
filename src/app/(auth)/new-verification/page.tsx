import VerificationForm from "@/components/auth/VerificationForm";
import { Suspense } from "react";

const NewVerification: React.FC = (props) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[400px] flex-col items-start justify-center gap-y-4">
        <h1 className="text-2xl font-semibold leading-none">
          Account Verification
        </h1>
        <Suspense>
          <VerificationForm />
        </Suspense>
      </div>
    </main>
  );
};

export default NewVerification;
