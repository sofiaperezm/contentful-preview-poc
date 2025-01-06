import { draftMode } from "next/headers";
import { getProductBySlug } from "@/lib/api";
import ProductPage from "./ProductPage";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const product = await getProductBySlug(params.slug, isEnabled);

  return <ProductPage product={product} />;
}
