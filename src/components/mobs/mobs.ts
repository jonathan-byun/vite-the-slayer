import { dealDamage } from "../../gamelogic/statusEffects";

export const slime:Mob={
maxHealth:20,
health:20,
outGoingDamageMultiplier:1,
outGoingFlatDamage:1,
incomingDamageMultiplier:1,
block:0,
statuses:[],
moves:[
    {name:'basic',effect:dealDamage,type:Movetypes.DAMAGE}
]
}