

export function applyVulnerable(entity: Player | Mob) {
    return {
        ...entity,
        incomingDamageMultiplier: 1.5
    }
}

export function dealDamage(entity: Player | Mob, damage: number) {
    const finalDamage = Math.round(damage * entity.incomingDamageMultiplier)
    return {
        ...entity,
        health: entity.health - finalDamage
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
    const updatedStatuses = entity.statuses.map((status) => {
        if (status.turns > 1) {
            return { ...status, turns: status.turns - 1 }
        }
    })
    return {
        ...entity,
        statuses:updatedStatuses
    }
}