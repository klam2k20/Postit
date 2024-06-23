import { User } from "next-auth";
import { Icons } from "../Icons";
import SignOutBtn from "../auth/SignOutBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import UserMenuItem from "./UserMenuItem";

interface IUserMenuProps {
  user: Pick<User, "name" | "image" | "email">;
}

// TODO: Add menu animation half size and opacity 0 -> full size and opacity 1
const UserMenu: React.FC<IUserMenuProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col items-start justify-center">
          <h1 className="text-lg">{user.name}</h1>
          <p className="text-xs text-zinc-700">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserMenuItem
          icon={<Icons.home className="h-5 w-5" />}
          label="Your Feed"
          link="/"
        />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserMenuItem
            icon={<Icons.note className="h-5 w-5" />}
            label="Create Post"
            link="/p/create/post"
          />
          <UserMenuItem
            icon={<Icons.plus className="h-5 w-5" />}
            label="Create Community"
            link="/p/create/community"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserMenuItem
          icon={<Icons.settings className="h-5 w-5" />}
          label="Settings"
          link="/settings"
        />
        <DropdownMenuSeparator />
        <SignOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
