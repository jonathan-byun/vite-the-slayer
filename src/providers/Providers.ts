import { Dispatch, createContext } from "react";

export const DeckContext = createContext<Card[]|null>(null)
export const DeckDispatchContext = createContext<Dispatch<DeckActionTypes>|null>(null)