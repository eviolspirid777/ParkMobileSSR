import { ItemBrandsEnum } from "./ItemBrands";
import { ItemCategoriesEnum } from "./ItemCategories";

export type CardType = {
    image: string,
    name: string,
    price: string,
    description: string,
    category: ItemCategoriesEnum,
    itemBrand: ItemBrandsEnum,
    stock: number,
}

export type RecivedCardDataType = {
    items: CardType[],
    count: number
}