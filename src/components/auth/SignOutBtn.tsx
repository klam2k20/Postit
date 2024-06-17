"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../ui/DropdownMenu";
import { Icons } from "../Icons";

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
        <Icons.signOut className="h-5 w-5" />
        Sign out
      </div>
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
