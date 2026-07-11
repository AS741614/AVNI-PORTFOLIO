import "./globals.css";
import { SITE } from "@/lib/config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeBar from "@/components/SubscribeBar";

export const metadata = {
  metadataBase: new URL("https://avniinireland.com"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.intro,
  openGraph: {
    title: SITE.name,
    description: SITE.intro,
    type: "website",
  },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <SubscribeBar />
      </body>
    </html>
  );
}
