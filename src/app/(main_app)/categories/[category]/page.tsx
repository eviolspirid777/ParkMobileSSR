import { ProductObertka } from "@/Components/Catalog/Products/ProductObertka/ProductObertka";

export const Page = async ({ params }: { params: { category: string } }) => {
  const selectedCategory = (await params).category;
  return <ProductObertka category={selectedCategory} />;
};

// Генерация статических параметров
export const generateStaticParams = async () => {
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Dyson",
    "Headphones",
    "Gaming",
  ];

  return categories.map((category) => ({
    category,
  }));
};

export default Page;
