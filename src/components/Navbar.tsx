import { StickyNote } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "./Icons";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const Navbar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 flex h-16 justify-center border border-b bg-zinc-100 p-4 lg:px-8">
      <nav className="flex w-full items-center justify-between">
        <Link
          href={"/"}
          className={cn(
            "flex items-center justify-center gap-2 text-lg md:text-xl lg:text-2xl",
            playfair.className,
          )}
        >
          <Icons.logo className="h-12 w-12" />
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
