import { signIn } from "next-auth/react";
import { Button } from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface ISocialLoginsProps {
  isSubmitting: boolean;
}

const SocialLogins: React.FC<ISocialLoginsProps> = ({
  isSubmitting,
}: ISocialLoginsProps) => {
  const socials = ["Google", "GitHub"];

  const onClick = async (social: string) => {
    social == "Google" ? await signIn("google") : await signIn("github");
  };

  return (
    <>
      {socials.map((s) => (
        <Button
          key={`${s} login`}
          variant={"outline"}
          disabled={isSubmitting}
          className="w-full border-zinc-900"
          onClick={() => onClick(s)}
        >
          {s == "Google" ? (
            <FcGoogle className="mr-2 h-4 w-4" />
          ) : (
            <FaGithub className="mr-2 h-4 w-4" />
          )}
          {`Sign in with ${s}`}
        </Button>
      ))}
    </>
  );
};

export default SocialLogins;
