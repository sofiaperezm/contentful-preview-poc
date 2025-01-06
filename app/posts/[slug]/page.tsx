import { draftMode } from "next/headers";
import { getPostAndMorePosts } from "@/lib/api";

import PostClient from "./PostClient";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  console.log("param posts", params.slug);
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);   

  return (
    <PostClient post={post} morePosts={morePosts} />
  );
}
