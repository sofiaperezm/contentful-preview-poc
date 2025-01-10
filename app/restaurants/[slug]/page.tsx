import { draftMode } from "next/headers";
import { getRestaurantBySlug } from "@/lib/api";
import RestaurantPage from "./RestaurantPage";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const restaurant = await getRestaurantBySlug(params.slug, isEnabled);

  return <RestaurantPage restaurant={restaurant} />;
}
