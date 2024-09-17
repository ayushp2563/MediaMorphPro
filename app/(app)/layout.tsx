"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Share2,
  Upload,
  Image as ImageIcon,
  User,
  X,
} from "lucide-react";
import { TbBackground } from "react-icons/tb";
import logo from "../apple-touch-icon.png";

const sidebarItems = [
  //{ href: "/home", icon: LayoutDashboard, label: "Home Page" },
  { href: "/social-share", icon: Share2, label: "Social Share" },
  { href: "/video-upload", icon: Upload, label: "Video Upload" },
  { href: "/image-to-url", icon: ImageIcon, label: "Image to URL" },
  // { href: "/remove-bg", icon: TbBackground, label: "Remove Background" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        (event.target as HTMLElement).closest(".sidebar") === null
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`sidebar bg-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <div className="flex items-center justify-between px-4">
          <span className="text-2xl font-semibold text-blue-400">Tools</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 ">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center py-2.5 px-4 mb-2 rounded transition duration-200 ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-gray-800 shadow-md">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link
                href="/"
                onClick={handleLogoClick}
                className="md:text-xl font-semibold text-blue-400 ml-2 flex flex-row"
              >
                <img
                  src={logo.src}
                  alt="Logo"
                  className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
                />
                MediaMorphPro
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <img
                      src={user.imageUrl}
                      alt={user.username || user.emailAddresses[0].emailAddress}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="hidden md:inline text-sm text-gray-300">
                      {user?.emailAddresses?.[0]?.emailAddress ||
                        user?.username ||
                        "Unknown"}
                    </span>
                  </button>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
