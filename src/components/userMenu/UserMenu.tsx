import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import UserMenuItem from "./UserMenuItem";
import SignOutBtn from "../auth/SignOutBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Icons } from "../Icons";

interface IUserMenuProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserMenu: React.FunctionComponent<IUserMenuProps> = ({
  user,
}: IUserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
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
