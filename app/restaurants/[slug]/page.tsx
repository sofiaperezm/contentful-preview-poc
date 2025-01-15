import { draftMode } from "next/headers";
import { getContentBySlug } from "@/lib/api";
import RestaurantPage from "./RestaurantPage";

export default async function RestaurantDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const restaurant = await getContentBySlug(params.slug, isEnabled, 'restaurant');

  return <RestaurantPage restaurant={restaurant} />;
}
