import { MoveTypes, StatusNames } from "../../enums/gameEnums";
import { applyStatus, applyVulnerable, dealDamage } from "../../gamelogic/statusEffects";

export function determineMob(level: number) {
    return slime
}

export const slime: Mob = {
    maxHealth: 20,
    health: 20,
    outGoingDamageMultiplier: 1,
    outGoingFlatDamage: 1,
    incomingDamageMultiplier: 1,
    block: 0,
    statuses: [],
    moves: [
        // { name: 'Spit', effect: (player:Player)=>dealDamage(player,5), type: MoveTypes.DAMAGE },
        {name:'Goop',effect:(player:Player)=>{
            return applyStatus({name:StatusNames.VULNERABLE,turns:2,effect:applyVulnerable},dealDamage(player,5))
        },
    type:MoveTypes.COMBINATION}
    ]
}