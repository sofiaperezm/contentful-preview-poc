import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 backdrop-blur-md bg-white/30 sticky top-0">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Preview</h1>
        <nav className="w-2/5 flex justify-end gap-6">
          <Link href="/" className="hover:text-success duration-200 transition-colors text-lg font-bold">Home</Link>
          <Link href="/restaurants" className="hover:text-success duration-200 transition-colors text-lg font-bold">Restaurants</Link>
        </nav>
      </div>
    </header>
  );
}