import { atom } from "jotai";

type TradeInAtom = {
    deviceType?: string,
    original?: string,
    reset?: string,
    condition?: string,
    username?: string,
    telephone?: string,
}

export const tradeInAtom = atom<TradeInAtom>();