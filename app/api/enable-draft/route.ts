import { getPreviewPostBySlug } from "@/lib/api";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  console.log(secret)
  console.log(slug)

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getPreviewPostBySlug(slug);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  draftMode().enable();

  const cookieStore = cookies();
  const cookie = cookieStore.get('__prerender_bypass');
  cookies().set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  });

  redirect(`/posts/${slug}`);
}
