import type { Metadata } from "next";
import { Saira_Semi_Condensed } from "next/font/google";
import "./globals.css";

const saira = Saira_Semi_Condensed({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-saira",
});

export const metadata: Metadata = {
  title: {
    default: "Szigeti Bikák",
    template: "Szigeti Bikák - %s",
  },
  description:
    "Szigeti Bikák SE Pesterzsébet - Egyesületünk hivatalos weboldala",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hu"
      className={`${saira.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}