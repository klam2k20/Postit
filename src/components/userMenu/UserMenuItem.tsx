import * as React from "react";
import { DropdownMenuItem } from "../ui/DropdownMenu";
import Link from "next/link";

interface IUserMenuItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const UserMenuItem: React.FC<IUserMenuItemProps> = ({
  icon,
  label,
  link,
}: IUserMenuItemProps) => {
  return (
    <DropdownMenuItem asChild>
      <div className="flex !items-end justify-start gap-2">
        {icon}
        <Link href={link}>{label}</Link>
      </div>
    </DropdownMenuItem>
  );
};

export default UserMenuItem;
