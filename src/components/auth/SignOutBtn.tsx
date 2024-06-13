"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../ui/DropdownMenu";

const SignOutBtn: React.FC = () => {
  const handleSignOut = (e: Event) => {
    e.preventDefault();
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <DropdownMenuItem onSelect={(e) => handleSignOut(e)}>
      Sign out
    </DropdownMenuItem>
  );
};

export default SignOutBtn;
