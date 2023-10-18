import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";
import GoogleAnalytics from "./GoogleAnalytics";

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Tactical Gamer — Everything Tactical Games"
    },
    description:
      settings?.description ||
      "Tactical Gamer — Everything Tactical Games",
    // keywords: ["Next.js", "Sanity", "Tailwind CSS"],
    // authors: [{ name: "Surjith" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Tactical Gamer",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    },

    icons: {
      icon: [
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        }
      ],
      // shortcut: ['/shortcut-icon.png'],
      apple: [
        // { url: '/apple-icon.png' },
        {
          url: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png"
        }
      ]
      // other: [
      //   {
      //     rel: 'apple-touch-icon-precomposed',
      //     url: '/apple-touch-icon-precomposed.png',
      //   },
      // ],
    },
    manifest: "/site.webmanifest"
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <>
      <GoogleAnalytics />
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
