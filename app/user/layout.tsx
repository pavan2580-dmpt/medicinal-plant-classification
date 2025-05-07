"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidenav from "@/components/Sidenav";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LeafMed",
//   description: "Upload leaf images to discover medicinal properties and uses",
//   icons: {
//     icon: "/favicon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; // Prevents rendering until authentication check is complete
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full h-screen">
            <div className="fixed h-screen">
              <Sidenav />
            </div>
            <div className="md:ml-64 w-full h-screen">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
