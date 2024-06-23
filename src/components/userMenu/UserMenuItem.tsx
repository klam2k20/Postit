import Link from "next/link";
import { DropdownMenuItem } from "../ui/DropdownMenu";

interface IUserMenuItemProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const UserMenuItem: React.FC<IUserMenuItemProps> = ({ icon, label, link }) => {
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
