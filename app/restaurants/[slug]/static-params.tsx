import { getAllRestaurants } from "@/lib/api";

export async function generateStaticParams() {
  const allRestaurants = await getAllRestaurants(true);

  return allRestaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }));
}
