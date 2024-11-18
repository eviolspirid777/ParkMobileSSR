"use client";
import { useEffect, useReducer, useState } from "react";
import { ContentType } from "@/Types/SliderContentType";
import { useAtom } from "jotai";
import { selectedRouteAtom } from "@/Store/RouteStore";
import { useRouter } from "next/navigation";
import { InputFileComponent } from "@/Components/InputFileComponent/InputFileComponent";
import { Footer } from "@/Components/Footer/Footer";
import { Catalog } from "@/Components/Catalog/Catalog";
import { UnderTilesLogos } from "@/Components/UnderTilesLogos/UnderTilesLogos";
import { Tiles } from "@/Components/Tiles/Tiles";
import { PopularItems } from "@/Components/PopularItems/PopularItems";
import { SwiperList } from "@/Components/Swiper/Swiper";
import { UnderSwiperCards } from "@/Components/UnderSwiperCards/UnderSwiperCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeaderComponentPack } from "@/Components/HeaderComponentPack/HeaderComponentPack";

const Home = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HeaderComponentPack />
        <SwiperList />
        <UnderSwiperCards />
        <PopularItems />
        <Tiles />
        <UnderTilesLogos />
        <Catalog />
        <InputFileComponent />
        <Footer />
      </QueryClientProvider>
    </>
  );
};

export default Home;
