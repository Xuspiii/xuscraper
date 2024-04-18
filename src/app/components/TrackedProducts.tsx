import React from "react";
import { getAllProducts } from "../lib/actions";
import ProductCard from "./ProductCard";

export default async function TrackedProducts() {
  const products = await getAllProducts();

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products?.map((product) => (
          <ProductCard
            key={product._id}
            image={product.image}
            title={product.title}
            url={`/products/${product._id}`}
          />
        ))}
      </div>
    </section>
  );
}
