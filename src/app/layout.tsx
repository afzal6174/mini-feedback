import "./globals.css";

import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/provider";
import { allFonts } from "@/lib/fonts/default";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Feedback App",
  description: "A simple feedback app built with Next.js, Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFonts}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
