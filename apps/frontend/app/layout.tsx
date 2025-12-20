
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

import Sidesbar from "@/components/Sidesbar";



const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider >
        <html lang="en" className={roboto.variable}>
          <body>
            <Sidesbar/>
              {children}

          </body>

        </html>
    </ClerkProvider>

  );
}
