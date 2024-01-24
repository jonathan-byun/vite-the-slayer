

export function applyVulnerable(entity: Player | Mob) {
    return {
        ...entity,
        incomingDamageMultiplier: 1.5
    }
}

export function calculateDamage(base:number,receiving:Player|Mob,performing:Player|Mob) {
    return(Math.round((base+performing.outGoingFlatDamage)*performing.outGoingDamageMultiplier*receiving.incomingDamageMultiplier))
}

export function dealDamage(receiving: Player | Mob,performing:Player|Mob, damage: number) {
    const finalDamage = calculateDamage(damage,receiving,performing)
    if (receiving.block > finalDamage) {
        return {
            ...receiving,
            block: receiving.block - finalDamage
        }
    }
    return {
        ...receiving,
        health: receiving.health - (finalDamage - receiving.block)
    }
}

export function applyBlock(entity: Player | Mob, blockAmount: number) {
    return {
        ...entity,
        block: blockAmount
    }
}

export function applyStatus(applyingStatus: Status, entity: Player | Mob) {
    let alreadyExisting = false;
    const updatedStatuses = entity.statuses.map((status) => {
        if (status.name === applyingStatus.name) {
            alreadyExisting = true
            return { ...status, turns: status.turns + 1 }
        } return status
    })
    if (!alreadyExisting) {
        updatedStatuses.push({ name: applyingStatus.name, turns: applyingStatus.turns, effect: applyingStatus.effect })
        let copiedEntity = applyingStatus.effect(entity)
        return { ...copiedEntity, statuses: updatedStatuses }
    }
    return {
        ...entity,
        statuses: updatedStatuses
    }
}

export function decrementStatuses(entity: Mob | Player) {
    let updatedStatuses = entity.statuses.filter((status) => status.turns > 1)
    updatedStatuses = updatedStatuses.map((status) => { return { ...status, turns: status.turns - 1 } })
    const entityWithAppliedStatuses = updatedStatuses.reduce(
        (currentEntity, status) => status?.effect(currentEntity),
        entity)
    return({
        ...entityWithAppliedStatuses,
        statuses: updatedStatuses
    })
}