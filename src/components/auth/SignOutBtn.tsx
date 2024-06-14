"use client";

import { signOut } from "next-auth/react";
import { BsArrowRightSquare } from "react-icons/bs";
import { DropdownMenuItem } from "../ui/DropdownMenu";

const SignOutBtn: React.FC = () => {
  const handleSignOut = (e: Event) => {
    e.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <DropdownMenuItem onSelect={(e) => handleSignOut(e)} asChild>
      <div className="flex cursor-pointer !items-end justify-start gap-2">
        <BsArrowRightSquare className="h-5 w-5" />
        Sign out
      </div>
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
