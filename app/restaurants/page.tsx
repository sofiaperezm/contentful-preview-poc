import { getAllContent } from '@/lib/api';
import { draftMode } from "next/headers";
import Card from '../components/Card';

export default async function RestaurantListing() {
  const { isEnabled } = draftMode();
  const restaurants = await getAllContent(isEnabled, 'restaurant');

  return (
    <div className="grid grid-cols-4 gap-8 m-8 mb-8 md:mb-16">
      {restaurants.map((restaurant: any) => (
        <Card key={restaurant.slug} restaurant={restaurant} />
      ))}
    </div>
  );
}
