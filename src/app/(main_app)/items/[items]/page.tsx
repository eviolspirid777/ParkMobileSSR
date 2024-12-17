import { ProductObertka } from "@/Components/Catalog/Products/ProductObertka/ProductObertka";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const selectedCategory = (await params).category;
  return <ProductObertka category={selectedCategory} />;
}

export const generateStaticParams = async () => {
  const categories = [
    {
      category: "Apple",
      items: [
        "iPhone",
        "MacBook",
        "iPad",
        "Apple Watch",
        "AirPods",
        "Apple TV",
      ]
    },
    {
      category: "Samsung",
      items: [
        "Смартфоны",
        "Наушники",
        "Умные часы",
      ]
    },
    {
      category: "Xiaomi"
    }
  ];

  return categories.map((category) => ({
    category,
  }));
};
