import { User } from "next-auth";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import SignOutBtn from "./auth/SignOutBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

interface IUserMenuProps {
  user: Pick<User, "name" | "image" | "email">;
}

//TODO: Add icons
const UserMenu: React.FunctionComponent<IUserMenuProps> = ({
  user,
}: IUserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/"}>Your Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/p/create/post"}>Create Post</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/p/create/community"}>Create Community</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/settings"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
