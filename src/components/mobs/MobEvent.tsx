import { FC, useContext, useEffect, useState } from 'react'
import { DeckContext, PlayerContext } from '../../providers/Providers'
import { determineMob } from './mobs'
import Card from '../deck/card'

interface MobEventProps {

}

const MobEvent: FC<MobEventProps> = ({ }) => {
    const playerContext = useContext(PlayerContext)
    const deck = useContext(DeckContext)
    const [mob, setMob] = useState<Mob>()
    const [playersTurn, setPlayersTurn] = useState(true)
    const player = playerContext!.player
    const healthPercentage = player.health * 100 / player.maxHealth
    useEffect(() => {
        setMob(determineMob(1))
    }, [])
    return <>
        <div className='absolute left-96 top-96 max-w-96'>
            <div className='flex flex-wrap gap-2'>
                {player.statuses.map((status) => {
                    return (
                        <p key={status.name} className='bg-white'>{status.name}: {status.turns}</p>
                    )
                })}
            </div>
            <div className='flex items-center bg-white rounded relative text-center'>
                <p className='absolute left-1/3'>{player.health}/{player.maxHealth}</p>
                <div className={'bg-green-600 h-6 rounded '} style={{ width: `${healthPercentage}%` }}>
                </div>
            </div>
            <img src='/mainChar.gif' className='w-80 h-80' />
        </div>
        {mob &&
            <div className='absolute right-96 top-96 max-w-96'>
                <div className='flex flex-wrap gap-2'>
                    {mob.statuses.map((status) => {
                        return (
                            <p key={status.name} className='bg-white'>{status.name}: {status.turns}</p>
                        )
                    })}
                </div>
                <div className='flex items-center bg-white rounded relative text-center'>
                    <p className='absolute left-1/3'>{mob.health}/{mob.maxHealth}</p>
                    <div className={'bg-green-600 h-6 rounded '} style={{ width: `${healthPercentage}%` }}>
                    </div>
                </div>
                <img src="/mobs/slime.gif" alt="" className='w-80 h-80' />
            </div>
        }
        <div className='flex max-w-10'>
          {deck &&
            deck.map((card, i) => {
                return (
                    <Card key={i} card={card} handPosition={i+1} />
                )
            })

        }  
        </div>
        

    </>
}

export default MobEvent