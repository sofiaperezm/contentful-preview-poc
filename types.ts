export interface ProductProps {
      image: { url: string };
      title: string;
      slug: string;
      category: string;
      description: any;
      price: number;
}

export interface RestaurantProps {
      image: { url: string };
      name: string;
      slug: string;
      phoneNumber: string;
      address: {lat: number, lon: number};
      fullAddress?: string;
}

export type ContentType = "post" | "restaurant";