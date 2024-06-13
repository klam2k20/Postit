import { getInitials } from "@/lib/utils";
import { User as UserIcon } from "lucide-react";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

interface IUserAvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = ({
  user,
}: IUserAvatarProps) => {
  return (
    <Avatar className="border border-zinc-900">
      <AvatarImage src={user?.image || ""} alt="User Avatar" />

      {user.name ? (
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      ) : (
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
