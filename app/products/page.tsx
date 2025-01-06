import { getAllProducts } from '@/lib/api';
import { draftMode } from "next/headers";
import ProductCard from '../components/ProductCard';

export default async function CatalogPage() {
  const { isEnabled } = draftMode();
  const products = await getAllProducts(isEnabled);

  return (
    <div className="grid grid-cols-4 gap-8 m-8 mb-8 md:mb-16">
      {products.map(product => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
