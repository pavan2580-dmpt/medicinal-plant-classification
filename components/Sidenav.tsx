"use client";

import { Leaf, Upload, LogOut, User, Search, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathname = usePathname(); // Get the current route path

  // Function to determine if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r sticky h-screen z-50">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="font-bold">LeafMed</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500">
              Dashboard
            </h2>
            <div className="space-y-1">
              <Link
                href="/user/dashboard"
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/user/dashboard")
                    ? "bg-green-100 text-green-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              <Link
                href="/user/history"
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/user/history")
                    ? "bg-green-100 text-green-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Search className="mr-2 h-4 w-4" />
                My Scans
              </Link>
              <Link
                href="/user/profile"
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/user/profile")
                    ? "bg-green-100 text-green-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </div>
          </div>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{localStorage.getItem("name")}</p>
              <p className="text-xs text-gray-500">{localStorage.getItem("email")}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full justify-start"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              localStorage.removeItem("name");
              window.location.href = "/";
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
