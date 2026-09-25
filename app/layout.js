import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "./globals.css";
import "./editorial.css";
import Providers from "./providers";
import BootstrapClient from "./BootstrapClient";
import SiteChrome from "@/components/Layout/SiteChrome";

export const metadata = {
  title: {
    default: "WatchWave - Watches for Every Moment",
    template: "%s | WatchWave",
  },
  description:
    "Discover the largest collection of watches to suit every style, brand, and budget on WatchWave, built with Next.js, Express, MongoDB and Node.js.",
  keywords: "WatchWave, Watches, MERN, Next.js, Node, Mongodb",
  authors: [{ name: "Khushpreet Singh" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Providers>
          <BootstrapClient />
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
