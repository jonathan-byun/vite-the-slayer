export function shuffleDeck(deck:Card[]) {
    for (let i=0;i<deck.length;i++) {
        const randomPlacement = Math.floor(Math.random()*(deck.length-1))
        const holder = deck[i]
        deck[i]=deck[randomPlacement]
        deck[randomPlacement]=holder
    }
}

export function getCardsBasedOnLevel(level:number) {
    
}