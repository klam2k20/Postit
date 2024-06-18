import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

interface IFormSuccessProps {
  message: string;
}

const FormSuccess: React.FC<IFormSuccessProps> = ({ message }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-y-6 text-sm">
      <p className="text-zinc-700">{message}</p>
      <Link
        href={"/sign-in"}
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
      >
        Return to Sign In
      </Link>
    </div>
  );
};

export default FormSuccess;
