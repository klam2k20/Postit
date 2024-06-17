import { cn, getInitials } from "@/lib/utils";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Icons } from "../Icons";

interface IUserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = ({
  user,
  className,
}: IUserAvatarProps) => {
  return (
    <Avatar className={cn("border border-zinc-900", className)}>
      <AvatarImage src={user?.image || ""} alt="User Avatar" />

      {user.name ? (
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      ) : (
        <AvatarFallback>
          <Icons.user className="h-6 w-6" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
