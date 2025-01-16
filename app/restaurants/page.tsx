import { getAllContent } from '@/lib/api';
import { draftMode } from "next/headers";
import Card from '../components/Card';

export default async function RestaurantListing() {
  const { isEnabled } = draftMode();
  const restaurants = await getAllContent(isEnabled, 'restaurant');

  return (
    <div className='container mx-auto px-5 my-8 md:my-16'>
      <h1 className='text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-12'>Visit us.</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
        {restaurants.map((restaurant: any) => (
          <Card key={restaurant.slug} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
