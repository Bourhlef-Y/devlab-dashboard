import type { Metadata } from "next"; // Import the Metadata type from next
import { GeistSans } from "geist/font/sans"; // Import GeistSans font from geist library
import { Toaster } from "@/components/ui/sonner"; // Import Toaster component for notifications
import { Analytics } from "@vercel/analytics/react"; // Import Analytics component from Vercel for tracking
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import SpeedInsights component from Vercel for performance insights

import "./globals.css"; // Import global CSS styles

import { ThemeProvider } from "@/providers/theme-provider"; // Import custom ThemeProvider component

// Define metadata for the application
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "DevLab", // Set the title of the application
};

// Define the RootLayout component
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode; // Define the type for children prop
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Set the language to English and suppress hydration warnings */}
      <body className={GeistSans.className}> {/* Apply GeistSans font to the body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem> {/* Wrap children with ThemeProvider */}
          {children} {/* Render children components */}
          <Analytics /> {/* Include Analytics component */}
          <SpeedInsights /> {/* Include SpeedInsights component */}
          <Toaster /> {/* Include Toaster component for notifications */}
        </ThemeProvider>
      </body>
    </html>
  );
}
