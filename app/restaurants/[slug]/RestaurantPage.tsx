'use client';

import { RestaurantProps } from "../../../types";
import ContentfulImageProps from "../../../lib/contentful-image";

export default function RestaurantPage({ restaurant }: { restaurant: RestaurantProps }) {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col my-12">
        <h1 className='text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-12'>{restaurant.name}.</h1>
        <div>
          <ContentfulImageProps src={restaurant.image.url} alt={restaurant.name} width={2000} height={1000} />
        </div>
        <div className="mt-10 h-full w-full p-6">
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-2">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
              </svg>

            </span>
            <p className="text-lg font-medium text-white">
              <b>Phone Number:</b> {restaurant.phoneNumber}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
              </svg>
            </span>
            <p className="text-lg font-medium text-white">
              <b>Address:</b> {restaurant.fullAddress}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
