'use client';

import { RestaurantProps } from "../../../types";
import ContentfulImageProps from "../../../lib/contentful-image";
  
export default function RestaurantPage({ restaurant }: { restaurant: RestaurantProps }) {
    return (
      <div className="m-8 px-12 flex justify-between">
        <div className="mx-8 flex flex-col">
          <h1>{restaurant.name}</h1>
          <p><b>Phone Number:</b> {restaurant.phoneNumber}</p>
          <p><b>Address:</b>  {restaurant.fullAddress}</p>
        </div>
        <div className="flex justify-center items-center h-60">
            <ContentfulImageProps src={restaurant.image.url} alt={restaurant.name} width={500} height={500} />
        </div>
      </div>
    );
}
  