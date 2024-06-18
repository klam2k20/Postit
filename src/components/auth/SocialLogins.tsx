import { signIn } from "next-auth/react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";

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
            <Icons.google className="mr-2 h-4 w-4" />
          ) : (
            <Icons.github className="mr-2 h-4 w-4" />
          )}
          {`Sign in with ${s}`}
        </Button>
      ))}
    </>
  );
};

export default SocialLogins;
