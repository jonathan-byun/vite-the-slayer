import { MoveTypes, StatusNames } from "../../enums/gameEnums";
import { applyStatus, applyVulnerable, dealDamage } from "../../gamelogic/statusEffects";
import Straight from "./moveAnimations/straightLeftRight";

export function determineMob(level: number) {
    return slime
}

export const slime: Mob = {
    maxHealth: 20,
    health: 20,
    outGoingDamageMultiplier: 1,
    outGoingFlatDamage: 0,
    incomingDamageMultiplier: 1,
    block: 0,
    statuses: [],
    moves: [
        {
            name: 'Spit',
            effect(player: Player, mob: Mob) {
                return (dealDamage(player, mob, this.damage))
            },
            type: [MoveTypes.DAMAGE],
            damage: 5,
            animation:(start:boolean,continueAfterAnimation:()=>void)=> <Straight imageString='/mobs/moves/spit.png' start={start} continueAfterAnimation={continueAfterAnimation}/>
        },
        {
            name: 'Goop',
            effect(player: Player, mob: Mob) {
                return applyStatus({ name: StatusNames.VULNERABLE, turns: 2, effect: applyVulnerable }, dealDamage(player, mob, this.damage))
            },
            type: [MoveTypes.DAMAGE, MoveTypes.STATUS],
            damage: 5,
            animation:(start:boolean,continueAfterAnimation:()=>void)=> <Straight imageString="/mobs/moves/goop.png" start={start} continueAfterAnimation={continueAfterAnimation}/>
        }
    ]
}