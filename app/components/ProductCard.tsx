import Link from 'next/link';
import ContentfulImageProps from '../../lib/contentful-image';
import { ProductProps } from '../../types';

export default function ProductCard({ product }: { product: ProductProps }) {
  return (
    <Link href={`/products/${product.slug}`}>
    <div className="p-4 border rounded-lg">
      <div className="flex justify-center items-center h-60">
        <ContentfulImageProps src={product.image.url} alt={product.title} width={200} height={200} />
      </div>
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p>{product.category}</p>
      <p>{product.description.json.content[0].content[0].value}</p>
      <p className="font-semibold">{`$${product.price}`}</p>
    </div>
    </Link>
  );
}