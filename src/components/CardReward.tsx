import { FC, useEffect, useState } from 'react'
import { getCardsByRarity } from '../lib/cards'

interface CardRewardProps {
   level:number
}

const CardReward: FC<CardRewardProps> = ({ }) => {
    const [cards, setCards] = useState<Card[]>([])
    useEffect(() => {
        getCardsByRarity()
    }, [])
    return <div>CardReward</div>
}

export default CardReward