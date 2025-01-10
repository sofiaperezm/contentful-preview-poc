import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Preview</h1>
        <nav>
          <Link href="/" className="mx-3 text-lg hover:underline">Home</Link>
          <Link href="/restaurants" className="mx-3 text-lg hover:underline">Restaurants</Link>
        </nav>
      </div>
    </header>
  );
}