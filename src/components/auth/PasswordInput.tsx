"use client";

import { forwardRef, useState } from "react";
import { Icons } from "../Icons";

interface IPasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);
    return (
      <div className="flex h-9 w-full items-center rounded-md border border-input border-zinc-900 bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type={show ? "text" : "password"}
          id="password"
          placeholder="******"
          className="w-full border-none p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
          ref={ref}
          {...props}
        />

        {show ? (
          <Icons.piEyeClosed
            className="h-4 w-4 cursor-pointer"
            onClick={() => setShow(false)}
          />
        ) : (
          <Icons.piEye
            className="h-4 w-4 cursor-pointer"
            onClick={() => setShow(true)}
          />
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
