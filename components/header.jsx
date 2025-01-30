import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  Star,
  Stars,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16  flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="image"
            width={250}
            height={70}
            className="h-16 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button className="font-medium " variant="outline">
                <LayoutDashboard size={3} />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="font-medium ">
                <Stars size={3} />
                <span className="hidden md:block">Growth Tools</span>
                <ChevronDown size={3} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/resume"} className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Build Resume</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/ai-cover-letter"}
                  className="flex items-center space-x-2"
                >
                  <PenBox className="h-4 w-4" />
                  <span>Cover Letter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/interview"}
                  className="flex items-center space-x-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Interview Prep</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton className="border-neutral-500 border px-4 py-2 rounded-md">
                {/* <Button variant="outline">Sign In</Button> */}
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
            appearance={{
                elements:{
                    avatarBox:"w-10 h-10 ",
                    userButtonPopoverCard:"shadow-xl",
                    userPreviewMainIdentifier:"font-semibold",
                }
            }}
            afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;