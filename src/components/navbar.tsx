"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign.out-btn";
import { useSession } from "@/lib/auth/auth.client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  console.log({ session, isPending });

  if (isPending) {
    return (
      <nav className="border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
          Loading...
        </div>
      </nav>
    );
  }
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase />
          Job Tracker
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href={"/dashboard"}>
                <Button
                  variant={"ghost"}
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white cursor-pointer">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name}</p>
                      <p>{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <Button
                  variant={"ghost"}
                  className="text-gray-700 hover:text-black"
                >
                  Log In
                </Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button className=" hover:bg-primary/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
