import PostPage from "./default";

import { urlForImage } from "@/lib/sanity/image";
import { getAllPostsSlugs, getPostBySlug } from "@/lib/sanity/client";

import { ArticleJsonLd } from "next-seo";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      images: [
        {
          url: imageProps.src || "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: post.title || "Tactical Gamer",
      card: "summary_large_image"
    }
  };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  console.log("SINGLE POST", post);
  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={post.slug.current}
        title={post.title}
        images={[
          imageProps.src
          // 'https://example.com/photos/4x3/photo.jpg',
          // 'https://example.com/photos/16x9/photo.jpg',
        ]}
        datePublished={post.publishedAt}
        dateModified={post._updatedAt}
        authorName={[
          {
            name: `${post.author.name}`
            // url: 'https://example.com',
          }
          // {
          //   name: 'Mary Stone',
          //   url: 'https://example.com',
          // },
        ]}
        publisherName="tactical Gamer"
        publisherLogo="/img/fav-logo.png"
        description={post.excerpt}
        isAccessibleForFree={true}
      />
      <PostPage post={post} />{" "}
    </>
  );
}

// export const revalidate = 60;
