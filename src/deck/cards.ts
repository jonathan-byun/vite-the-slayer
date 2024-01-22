
import { StatusNames } from "../enums/gameEnums";
import { applyBlock, applyStatus, applyVulnerable, dealDamage } from "../gamelogic/statusEffects";

export const playerStartingCards: Card[] = [
    {
        name: 'Punch',
        effect: (mob: Mob) => dealDamage(mob, 7),
        cost: 1,
        description:'Deal 7 Damage'
    },
    {
        name: 'Shank',
        effect: (mob: Mob) => {
            return (dealDamage
                (applyStatus(
                    { name: StatusNames.VULNERABLE, turns: 2, effect: applyVulnerable },
                    mob
                ), 3))
        },
        cost: 2,
        description:'Deal 3 damage and apply 2 Vulnerable'
    },
    {
        name:'Defend',
        effect:(player:Player)=>applyBlock(player,5),
        cost:1,
        description:'Gain 5 block'
    }
]