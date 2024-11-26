import { Products } from "@/Components/Catalog/Products/Products";
import axios from "axios";
import https from "https";
// import { useState } from "react";
//TODO: Нужно перенести Все эти действия внутрь импортируемой клиентской компоненты Products и оперировать с ней уже(там и UseQuery можно)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Отключает проверку сертификата
});

export const Page = async ({ params }: { params: { category: string } }) => {
  // Извлекаем текущую категорию из параметров маршрута
  // const selectedCategory = (await params).category;

  // const [skip, setSkip] = useState(0);
  // const [take] = useState(16);

  // const [currentPage, setCurrentPage] = useState(1);
  // Отправляем запрос на сервер для получения товаров по категории
  try {
    const { data: categoryItems } = await axios.post(
      `api/ItemsPostgre?skip=10&take=5&filter=Apple`,
      {}, // Или "/api/ItemsPostgre/getCategoryItems" если настроен proxy
      { httpsAgent }
    );
    // Рендерим данные
    return (
      <Products
        cards={categoryItems?.items}
        itemsCount={categoryItems?.count}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
    );
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
    return <p>Ошибка при загрузке товаров</p>;
  }
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
