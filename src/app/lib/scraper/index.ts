import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency } from "../utils";

export async function scrapeAmazonProduct(productUrl: string) {
  if (!productUrl) return;

  // BrighData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = Math.floor(Math.random() * 1000000) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password: password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);


    const title = $("#productTitle").text().trim();

    const currentPrice = $("span.a-price span.a-offscreen").first().text().trim().replace(/[^0-9.]/g, "");

    // const priceWhole = $("span.a-price-whole").first().text().trim();
    // const priceFraction = $("span.a-price-fraction").first().text().trim();

    const ofOutStock = $("#availability span").text().trim().toLowerCase() === "currently unavailable";

    const images = $("#imgBlkFront").attr("data-a-dynamic-image") || $("#landingImage").attr("data-a-dynamic-image") || "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));

    const discountRate = $(".savingsPercentage").first().text().replace(/[-%]/g, "");

    const data = {
      productUrl,
      currency: currency || "€",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      lowestPrice: Number(currentPrice),
      highestPrice: Number(currentPrice),
      averagePrice: Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      isOutOfStock: ofOutStock,
    }

    // console.log(data);
    return data;

  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
