
import { StatusNames, TargetTypes } from "../enums/gameEnums";
import { applyBlock, applyStatus, applyVulnerable, dealDamage } from "../gamelogic/statusEffects";

export const playerStartingCards: Card[] = [
    {
        name: 'Punch',
        effect: (mob: Mob,player:Player) => dealDamage(mob, player,7),
        cost: 1,
        description:'Deal 7 Damage',
        target:TargetTypes.ENEMY
    },
    {
        name: 'Shank',
        effect: (mob: Mob,player:Player) => {
            return (applyStatus({name:StatusNames.VULNERABLE,turns:2,effect:applyVulnerable},dealDamage(mob,player,3)))
        },
        cost: 2,
        description:'Deal 3 damage and apply 2 Vulnerable',
        target:TargetTypes.ENEMY
    },
    {
        name:'Defend',
        effect:(player:Player)=>applyBlock(player,5),
        cost:1,
        description:'Gain 5 block',
        target:TargetTypes.SELF
    },
    {
        name: 'Punch',
        effect: (mob: Mob,player:Player) => dealDamage(mob,player, 7),
        cost: 1,
        description:'Deal 7 Damage',
        target:TargetTypes.ENEMY
    },
]