
import { CardRarities, StatusNames, TargetTypes } from "../enums/gameEnums";
import { applyBlock, applyStatus, applyVulnerable, dealDamage } from "../gamelogic/statusEffects";
import StraightCard from "./cardAnimations/straightCard";

export const Cards = {
    punch: {
        name: 'Punch',
        effect: ((mob: Mob, player: Player) => { return (dealDamage(mob, player, 7) as Mob | Player) }),
        cost: 1,
        description: 'Deal 7 Damage',
        target: TargetTypes.ENEMY,
        rarity: CardRarities.STARTING,
        animation: (start: boolean, continueAfterAnimation: () => void) => <StraightCard imageString={'/cards/punch.png'} start={start} continueAfterAnimation={continueAfterAnimation} />
    },
    shank: {
        name: 'Shank',
        effect: (mob: Mob, player: Player) => {
            return (applyStatus({ name: StatusNames.VULNERABLE, turns: 2, effect: applyVulnerable }, dealDamage(mob, player, 3)))
        },
        cost: 2,
        description: 'Deal 3 damage and apply 2 Vulnerable',
        target: TargetTypes.ENEMY,
        rarity: CardRarities.STARTING
    },
    defend: {
        name: 'Defend',
        effect: (player: Player) => applyBlock(player, 5),
        cost: 1,
        description: 'Gain 5 block',
        target: TargetTypes.SELF,
        rarity: CardRarities.STARTING
    },
}


const startingMakeup = [
    {
        name: 'punch',
        number: 5
    },
    {
        name: 'defend',
        number: 6
    },
    {
        name: 'shank',
        number: 1
    }
]

function getStartingCards() {
    let returnArray = []
    for (let i = 0; i < startingMakeup.length; i++) {
        for (let j = 0; j < startingMakeup[i].number; j++) {
            returnArray.push((Cards[startingMakeup[i].name as keyof typeof Cards]))
        }
    }
    return returnArray
}


export const playerStartingCards = getStartingCards()