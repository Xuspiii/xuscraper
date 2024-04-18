import Searchbar from "./components/Searchbar";
import TrackedProducts from "./components/TrackedProducts";


export default function Home() {
  return (
    <main className="flex flex-col items-center gap-10 min-h-screen py-20 px-15 max-w-[800px] mx-auto">
      <h1 className="text-4xl">Xuscraper</h1>
      <p className="self-start text-xl">
        Copia y pega la URL de un producto de Amazon para empezar a trackear los precios de un producto de Amazon.
      </p>
      <Searchbar />
      <TrackedProducts />
    </main>
  );
}
