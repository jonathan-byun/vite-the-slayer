/// <reference types="vite/client" />

enum DeckActions {
    ADD_CARD = 'ADD_CARD'
}

type DeckState = Card[] | null

type Card = {
    name: string,
    effect: function,
    cost:number,
    description:string,
    target:string
}

type AddCardToDeckAction = {
    type: typeof DeckActions.ADD_CARD,
    card: Card
}

type DeckActionTypes = AddCardToDeckAction

type MapNode = {
    encounterType: EncounterTypes,
    id: number,
    level: number,
    next: MapNode[],
    position: number

}

enum EncounterTypes {
    MOB = 'MOB',
    SHOP = 'SHOP',
    RANDOM = 'RANDOM',
    REST = 'REST',
    BOSS = 'BOSS'
}

type numberStringObject = {
    [key: number]: string
}

type Map = []

type Status = {
    name:string,
    turns:number,
    effect:function,
}



type Player = {
    health: number,
    maxHealth: number,
    outGoingDamageMultiplier: number,
    outGoingFlatDamage: number,
    incomingDamageMultiplier: number,
    block: number,
    stamina: number,
    maxStamina:number,
    statuses: { name: string, turns: number, effect: function }[]
}

type Mob = {
    health: number,
    maxHealth: number,
    outGoingDamageMultiplier: number,
    outGoingFlatDamage: number,
    incomingDamageMultiplier: number,
    block: number,
    statuses: { name: string, turns: number, effect: function }[],
    moves: Moves[]
}

type Move = {
    name: string,
    effect: function
}

interface DamageMove extends Move {
    type: typeof Movetype.DAMAGE
}

type Moves = DamageMove