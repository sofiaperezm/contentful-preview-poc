import { getContentBySlug } from "@/lib/api";
import { ContentType } from '../../../types'
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  if (!secret || !slug || !type) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const content = await getContentBySlug(slug, true, type as ContentType);
  if (!content) {
    return new Response("Content not found", { status: 404 });
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
