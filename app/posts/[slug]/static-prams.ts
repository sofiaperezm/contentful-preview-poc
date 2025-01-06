import { getAllPosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(true);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}