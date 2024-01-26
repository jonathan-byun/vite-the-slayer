import { FC, useState } from 'react'
import { RewardTypes } from '../enums/gameEnums'
import CardReward from './CardReward'

interface RewardScreenProps {
    level: number
}

const RewardScreen: FC<RewardScreenProps> = ({ level }) => {
    const [showChoosingCards, setShowChoosingCards] = useState(true)
    const [rewards, setRewards] = useState<string[]>([RewardTypes.CARD])
    return (
        <>
            <div className='bg-amber-300 w-3/5 h-4/5'>
                {
                    rewards.map((reward, i) => {
                        if (reward === RewardTypes.CARD) {

                            return (
                                <CardReward key={i} level={level} />
                            )
                        }
                    })
                }
            </div>
        </>
    )
}

export default RewardScreen