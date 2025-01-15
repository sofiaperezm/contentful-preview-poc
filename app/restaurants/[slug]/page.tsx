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

  if (restaurant && restaurant.address) {
    const { lat, lon } = restaurant.address;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lon }),
    });

    const { address } = await response.json();
    
    restaurant.fullAddress = address;
  }

  return <RestaurantPage restaurant={restaurant} />;
}
