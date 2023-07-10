import NavBar from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";
import { IsMobileThemeProvider } from "./context/NavBarContext";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Designer",
  description: "Your Designer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className="relative box-border overflow-x-hidden h-full flex flex-col min-h-screen">
          <IsMobileThemeProvider>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </IsMobileThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
