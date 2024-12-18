import { atom } from "jotai";

export type TradeInType = {
    deviceType?: string,
    color?: string,
    model?: string,
    original?: string,
    reset?: string,
    condition?: string,
    username?: string,
    telephone?: string,
}

export const tradeInAtom = atom<TradeInType>();