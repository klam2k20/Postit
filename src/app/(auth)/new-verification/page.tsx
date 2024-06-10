import VerificationForm from "@/components/auth/VerificationForm";
import { Button } from "@/components/ui/Button";

const NewVerification: React.FC = (props) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <VerificationForm />
    </main>
  );
};

export default NewVerification;
