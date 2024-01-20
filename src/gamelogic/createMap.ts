export function createMap() {
    const numberOfLevels = 7
    const nodesPerLevel = 5
    const levels = populateMap(numberOfLevels, nodesPerLevel)
    //create grid of mapnodes
    const numberOfMapLines = 3

    for (let i = 0; i < numberOfMapLines; i++) {
        let currentNode = levels[0][getRandomInt(0, nodesPerLevel)]
        while (currentNode.level < numberOfLevels - 1) {
            const positionRange = { lower: currentNode.position - 1, upper: currentNode.position + 1 }
            if (currentNode.position === 0) {
                positionRange.lower++
                positionRange.upper += 2
            }
            if (currentNode.position === nodesPerLevel - 1) {
                positionRange.upper--
                positionRange.lower -= 2
            }
            const nextNode = (levels[currentNode.level + 1][getRandomInt(positionRange.lower, positionRange.upper)])
            if (currentNode.next.indexOf(nextNode) == -1) {
                currentNode.next.push(nextNode)
            }
            currentNode = nextNode
        }
    }
    const bossNode = createMapNode(-1, numberOfLevels, 2, 'BOSS')
    //connect last row of nodes to boss
    //iterate through the second to last row to find nodes that are connected
    for (let i = 0; i < levels[numberOfLevels - 2].length; i++) {
        const secondToLastNode = levels[numberOfLevels - 2][i]
        //if the lastNode has not yet been added the .next will be updated and the node pushed to lastNodes
        for (let j = 0; j < secondToLastNode.next.length; j++) {
            const lastNode = secondToLastNode.next[j]
            if (lastNode.next.indexOf(bossNode)===-1) {
                lastNode.next.push(bossNode)
            }
        }

    }
    levels.push([bossNode])
    //splice all nodes in the arrays that don't point to another node
    for (let i = 0; i < numberOfLevels; i++) {
        for (let j = 0; j < levels[i].length; j++) {
            if (levels[i][j].next.length < 1) {
                levels[i].splice(j, 1)
                j--
            }
        }
    }
    return levels
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

function populateMap(numberOfLevels: number, nodesPerLevel: number) {
    const levels = []
    let id = 1
    for (let i = 0; i < numberOfLevels; i++) {
        const currentLevel = []
        for (let j = 0; j < nodesPerLevel; j++) {
            currentLevel.push(createMapNode(id++, i, j, null))
        }
        levels.push(currentLevel)
    }
    return levels
}

export function createMapNode(id: number, level: number, position: number, encounter: string | null) {
    if (!encounter) {
        const roll = Math.random()
        if (roll <= .45) {
            encounter = 'MOB'
        } else if (roll <= .55) {
            encounter = 'SHOP'
        } else if (roll <= .85) {
            encounter = 'RANDOM'
        } else if (roll <= 1) {
            encounter = 'REST'
        }
    }

    return <MapNode>{
        encounterType: encounter,
        id: id,
        level: level,
        next: [],
        position: position
    }
}