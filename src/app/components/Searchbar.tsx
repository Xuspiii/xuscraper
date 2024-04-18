"use client";

import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "../lib/actions";

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export default function Searchbar() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductUrl(searchPrompt);

    if (!isValidLink) return alert("Invalid Amazon Product URL");

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-4 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ej: https://www.amazon.es/Mancuernas-Neopreno-Disponibles-Revestimiento-Antideslizantes/dp/B095KPCHHC/?_encoding=UTF8&ref_=pd_gw_ci_mcx_mr_hp_atf_m"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        className="bg-gray-800 w-full p-2 rounded-md"
      />
      <button
        className={`bg-blue-500 rounded-md px-4 py-2 ${
          searchPrompt === "" ? "text-gray-300" : "text-white"
        }`}
        type="submit"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}
