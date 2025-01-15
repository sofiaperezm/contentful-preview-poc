import { getAllContent } from "@/lib/api";

export async function generateStaticParams() {
  const allRestaurants = await getAllContent(true, 'restaurant');

  return allRestaurants.map((restaurant: any) => ({
    slug: restaurant.slug,
  }));
}
