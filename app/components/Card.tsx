import Link from 'next/link';
import ContentfulImageProps from '../../lib/contentful-image';
import { RestaurantProps } from '../../types';

export default function Card({ restaurant }: { restaurant: RestaurantProps }) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
    <div className="p-4 rounded-lg">
      <div className="mb-4">
        <ContentfulImageProps src={restaurant.image.url} alt={restaurant.name} width={600} height={200} />
      </div>
      <h2 className="text-lg font-bold">{restaurant.name}</h2>
    </div>
    </Link>
  );
}