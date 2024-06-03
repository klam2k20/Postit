import { StickyNote } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 flex h-16 justify-center border border-b bg-zinc-100 p-4 lg:px-8">
      <nav className="flex w-full items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2 lg:text-xl"
        >
          <StickyNote className="h-6 w-6 lg:h-8 lg:w-8" />
          Postit
        </Link>

        <Link className={cn(buttonVariants())} href={"/sign-in"}>
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
