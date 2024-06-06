import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";

const playfair = Playfair_Display({ subsets: ["latin"] });

const Navbar: React.FC = async () => {
  return (
    <header className="fixed inset-x-0 top-0 flex h-16 justify-center border border-b bg-zinc-100 p-4 lg:px-8">
      <nav className="flex w-full items-center justify-between">
        <Link
          href={"/"}
          className={cn(
            "flex items-center justify-center gap-2 text-lg leading-tight tracking-wide lg:text-2xl",
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
