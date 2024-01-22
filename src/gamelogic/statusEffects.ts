

export function applyVulnerable(entity: Player | Mob) {
    return {
        ...entity,
        incomingDamageMultiplier: entity.incomingDamageMultiplier * 1.5
    }
}

export function dealDamage(entity: Player | Mob, damage: number) {
    return {
        ...entity,
        health: entity.health - damage
    }
}

export function applyBlock(entity:Player |Mob,blockAmount:number){
    return{
        ...entity,
        block:blockAmount
    }
}

export function applyStatus(applyingStatus:Status,entity:Player|Mob) {
    let alreadyExisting = false;
            const updatedStatuses=entity.statuses.map((status)=>{
                if(status.name===applyingStatus.name) {
                    alreadyExisting=true
                    return{...status,turns:status.turns+1}
                } return status
            })
            if(!alreadyExisting) {
                updatedStatuses.push({name:applyingStatus.name,turns:applyingStatus.turns,effect:applyingStatus.effect})
            }
    return {
        ...entity,
        statuses:updatedStatuses
    }
}