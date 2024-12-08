"use client";
import { InputFileComponent } from "@/Components/InputFileComponent/InputFileComponent";
import { Catalog } from "@/Components/Catalog/Catalog";
import { UnderTilesLogos } from "@/Components/UnderTilesLogos/UnderTilesLogos";
import { Tiles } from "@/Components/Tiles/Tiles";
import { PopularItems } from "@/Components/PopularItems/PopularItems";
import { SwiperList } from "@/Components/Swiper/Swiper";
import { UnderSwiperCards } from "@/Components/UnderSwiperCards/UnderSwiperCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = () => {
  const queryClient = new QueryClient();

  //TODO: Нужно сделать loadingPage
  //TODO: Нужно сделать страницу ошибки
  //TODO: сделать вариант навигации при выборе категории в header
  //TODO: Реализовать поиск на декстопной версии и мобильной
  //TODO: Сделать возможность добавления товара в корзину
  //TODO: Сделать возможность выбора options у товара
  //TODO: Добавить возможность выбора и добавления в корзину ПОПУЛЯРНЫХ ТОВАРОВ

  //TODO: Сделать возможность загрузки фоток в слайдер(ну это уже необязательно)
  //TODO: Сделать возможность добавления/удаления брендов в админке
  //TODO: Добавить поиск товаров в таблицу редактирования товаров
  //TODO: Добавить выборку options у товаров
  //TODO: Добавить возможность добавления options у товаров
  //TODO: Добавить возможность редактирования популярных товаров

  //THEN READY TO DEPLOY!!!
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SwiperList />
        <UnderSwiperCards />
        <PopularItems />
        <Tiles />
        <UnderTilesLogos />
        <Catalog />
        {/* TODO:Удали меня! Не ЗАБУДЬ! */}
        <InputFileComponent />
      </QueryClientProvider>
    </>
  );
};

export default Home;
