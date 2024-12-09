export type CardTypeAdmin = {
    key: number,
    name: string,
    article: string,
    count: number,
    price: string,
    image: string;
    stock?: number;
    id?: number;
}

export type RecivedCardDataAdminType = {
    items: CardTypeAdmin[],
    count: number
}