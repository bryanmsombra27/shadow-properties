import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Shadow Properties",
  description: "A collection of  properties for rent",
  keywords: ["properties", "rent", "shadow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>

          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
