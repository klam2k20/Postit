import { getInitials } from "@/lib/utils";
import { FiUser } from "react-icons/fi";
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
          <FiUser className="h-6 w-6" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
