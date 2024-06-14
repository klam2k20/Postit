import { User } from "next-auth";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaStickyNote } from "react-icons/lia";
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
        <UserMenuItem
          icon={<GoHome className="h-5 w-5" />}
          label="Your Feed"
          link="/"
        />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserMenuItem
            icon={<LiaStickyNote className="h-5 w-5" />}
            label="Create Post"
            link="/p/create/post"
          />
          <UserMenuItem
            icon={<AiOutlinePlusCircle className="h-5 w-5" />}
            label="Create Community"
            link="/p/create/community"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserMenuItem
          icon={<IoSettingsOutline className="h-5 w-5" />}
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
