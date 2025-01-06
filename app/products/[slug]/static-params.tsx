import { getAllProducts } from "@/lib/api";

export async function generateStaticParams() {
  const allProducts = await getAllProducts(true);

  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}
