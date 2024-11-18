import { ItemCategoriesEnum } from '@/Types/ItemCategories';
import { atom } from 'jotai'

export const categoryDictionary = new Map([
    ["Все", -1],
    ["iPhone", ItemCategoriesEnum.Iphone],
    ["iPad", ItemCategoriesEnum.Ipad],
    ["Watch", ItemCategoriesEnum.Watch],
    ["Mac", ItemCategoriesEnum.Mac],
    ["Airpods", ItemCategoriesEnum.Airpods],
    ["Аксессуары", ItemCategoriesEnum.Accessories],
    ["Гаджеты", ItemCategoriesEnum.Gadgets],
    ["Аудио", ItemCategoriesEnum.Audio],
    ["Смартфоны", ItemCategoriesEnum.Phones],
    ["Гейминг", ItemCategoriesEnum.Gaming],
    ["Красота и здоровье", ItemCategoriesEnum.Health],
    ["TV и Дом", ItemCategoriesEnum.Tv],
    ["Популярное", -1]
])

export const categoryAtom = atom<string>();