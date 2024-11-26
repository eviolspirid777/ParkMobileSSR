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
