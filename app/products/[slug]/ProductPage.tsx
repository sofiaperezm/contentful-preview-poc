'use client';

import { Markdown } from "@/lib/markdown";
import { ProductProps } from "../../../types";
import ContentfulImageProps from "../../../lib/contentful-image";
  
export default function ProductPage({ product }: { product: ProductProps }) {
    return (
      <div className="m-8 px-12 flex justify-between">
        <div className="mx-8 flex flex-col">
          <h1>{product.title}</h1>
          <div className="prose">
            <Markdown content={product.description} />
          </div>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
        <div className="flex justify-center items-center h-60">
            <ContentfulImageProps src={product.image.url} alt={product.title} width={500} height={500} />
        </div>
      </div>
    );
}
  