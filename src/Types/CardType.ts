import { ItemBrandsEnum } from "./ItemBrands";
import { ItemCategoriesEnum } from "./ItemCategories";

export type CardType = {
    id?: number;
    image: string,
    name: string,
    price: string,
    description: string,
    category: ItemCategoriesEnum,
    itemBrand: ItemBrandsEnum,
    stock: number,
    options?: string
}

export type CardItemType = {
    id?: number;
    image?: string,
    name?: string,
    price?: string,
    description?: string,
    categoryName?: string,
    brandName?: string,
    stock: number,
    options?: string,
}

export type RecivedCardDataType = {
    items: CardType[],
    count: number
}