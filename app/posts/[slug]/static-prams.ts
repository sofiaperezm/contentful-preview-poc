import { getAllContent } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllContent(true, 'post');

  return allPosts.map((post: any) => ({
    slug: post.slug,
  }));
}