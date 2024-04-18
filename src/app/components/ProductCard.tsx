import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  title: string;
  url: string;
};

export default function ProductCard({ image, title, url }: Props) {
  return (
    <Link href={url}>
      <Image src={image} alt={title} width={200} height={200} className="object-cover" />
      <h2 className="line-clamp-2 overflow-hidden mt-2">{title}</h2>
    </Link>
  );
}
