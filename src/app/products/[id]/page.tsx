import { getProductById } from "@/app/lib/actions";
import { formatPrice } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({ params: { id } }: Props) {
  const product = await getProductById(id);

  console.log(product);

  if (!product) {
    redirect("/");
  }

  const currentPriceFormatted = formatPrice(product.currentPrice);
  const highestPriceFormatted = formatPrice(product.highestPrice);
  const lowestPriceFormatted = formatPrice(product.lowestPrice);
  const currency = product.currency;

  return (
    <>
      <main className="py-20 px-8 mx-auto max-w-[800px]">
        <h1 className="mb-5">{product.title}</h1>
        <div className="flex gap-5">
          <Image
            className="rounded-md"
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
          />
          <div className="bg-gray-900 px-5 py-8 flex flex-col gap-2 items-end rounded-md">
            <p>
              Precio actual: {currentPriceFormatted}
              {currency}
            </p>
            <p>
              Precio máximo: {highestPriceFormatted}
              {currency}
            </p>
            <p>
              Precio mínimo: {lowestPriceFormatted}
              {currency}
            </p>
          </div>
        </div>
      </main>
      <Link href="/" className="absolute top-2 left-2">
        Volver a inicio
      </Link>
    </>
  );
}
