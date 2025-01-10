import Link from 'next/link';
import ContentfulImageProps from '../../lib/contentful-image';
import { RestaurantProps } from '../../types';

export default function Card({ restaurant }: { restaurant: RestaurantProps }) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
    <div className="p-4 border rounded-lg">
      <div className="flex justify-center items-center h-60">
        <ContentfulImageProps src={restaurant.image.url} alt={restaurant.name} width={200} height={200} />
      </div>
      <h2 className="text-lg font-bold">{restaurant.name}</h2>
      <p className="font-semibold">Phone number: {restaurant.phoneNumber}</p>
    </div>
    </Link>
  );
}