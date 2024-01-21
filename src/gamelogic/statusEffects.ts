export function vulnerable(entity: Player | Mob) {
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