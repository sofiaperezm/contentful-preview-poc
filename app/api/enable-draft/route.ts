import { getPreviewPostBySlug, getProductBySlug } from "@/lib/api";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type")

  if (!secret || !slug || !type) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  let content;
  switch (type) {
    case "post":
      content = await getPreviewPostBySlug(slug);
      if (!content) {
        return new Response("Post not found", { status: 404 });
      }
      break;
    case "product":
      content = await getProductBySlug(slug, true);
      if (!content) {
        return new Response("Product not found", { status: 404 });
      }
      break;
    default:
      return new Response("Invalid content type", { status: 400 });
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

  redirect(`/${type}s/${slug}`);
}
